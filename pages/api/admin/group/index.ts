import type { NextApiRequest, NextApiResponse } from "next";

import type { DocumentData } from "firebase/firestore";

import firestoreCollectionConfig from "../../../../src/configs/firestoreCollectionConfig";
import firebase from "../../../../src/utils/firebase";
import {
  generatePromiseOfDeleteGroupWithForms,
  generatePromiseOfDeleteGroupWithNoForms,
} from "../../../../src/utils/groupApiUtils";

const { GROUPS, FORMS, USERS } = firestoreCollectionConfig;

interface Data {
  status: string;
  status_code: number;
  message: string;
  data?: {
    groups?: DocumentData[];
    forms?: (DocumentData | undefined)[];
    groupId?: string;
    createdTime?: Date;
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "GET") {
    try {
      const uidRaw = req.headers.authorization;
      if (!uidRaw) throw new Error("need admin's id to get group data back");
      const uid = uidRaw.split(" ")[1];
      const groupData = await firebase.getAllEqualDoc(GROUPS, "adminId", uid).catch(() => {
        throw new Error("取得群組資料失敗");
      });

      const hasNoGroup = groupData && groupData.length === 0;
      if (hasNoGroup) {
        res.status(200).json({
          status: "success",
          status_code: 200,
          message: "return emtpy group list and forms since admin have not created groups yet",
        });
        return;
      }

      const formsList: string[] = [];
      groupData.forEach((d) => {
        formsList.push(...d.forms);
      });

      const hasNoForms = formsList[0] === "";
      if (hasNoForms) {
        res.status(200).json({
          status: "success",
          status_code: 200,
          message: "get admin's group and form data back!",
          data: {
            groups: groupData,
          },
        });
        return;
      }

      const fetchFormsList = formsList.map((formId) => firebase.getDocData(FORMS, formId));
      const forms = await Promise.all(fetchFormsList);

      res.status(200).json({
        status: "success",
        status_code: 200,
        message: "get admin's group and form data back!",
        data: {
          groups: groupData,
          forms,
        },
      });
    } catch (error: any) {
      const { message } = error;
      res.status(400).json({
        status: "fail",
        status_code: 400,
        message,
      });
    }
  }

  if (req.method === "POST") {
    try {
      const uidRaw = req.headers.authorization;
      if (!uidRaw) throw new Error("使用者必須登入才能新增群組");
      const { newGroupName } = req.body;
      if (!newGroupName) throw new Error("fail to add a group, need new group name");
      const uid = uidRaw.split(" ")[1];
      const groupDoc = firebase.generateDocRef("groups");
      const groupDocId = groupDoc.id;
      const createdTime = new Date();
      const newGroupData = {
        id: groupDocId,
        adminId: uid,
        name: newGroupName,
        forms: [],
        createdTime,
      };

      const createNewGroupAjaxList = [
        firebase
          .updateFieldArrayValue({
            docPath: `${USERS}/${uid}`,
            fieldKey: "groupId",
            updateData: groupDocId,
          })
          .catch(() => {
            throw new Error("fail to update new group in users");
          }),
        firebase.setNewDoc(groupDoc, newGroupData).catch(() => {
          throw new Error("fail to create new group in groups");
        }),
      ];

      await Promise.all(createNewGroupAjaxList);

      res.status(201).json({
        status: "success",
        status_code: 201,
        message: "create new group successfully!",
        data: {
          groupId: groupDoc.id,
          createdTime,
        },
      });
    } catch (error: any) {
      const { message } = error;
      res.status(400).json({
        status: "fail",
        status_code: 400,
        message,
      });
    }
  }

  if (req.method === "DELETE") {
    try {
      const uidRaw = req.headers.authorization;
      if (!uidRaw) throw new Error("使用者必須登入才能刪除群組");
      const { groupId } = req.body;
      if (!groupId) throw new Error("找不到群組資料，請重新嘗試");
      const uid = uidRaw.split(" ")[1];
      const groupData = await firebase.getDocData(GROUPS, groupId);
      if (!groupData) throw new Error("找不到群組資料，請重新嘗試");
      const hasNoForms = groupData && groupData.forms.length === 0;

      let promiseList: Promise<void>[] | [] = [];
      if (hasNoForms) {
        promiseList = generatePromiseOfDeleteGroupWithNoForms(uid, groupId);
      } else {
        const { forms } = groupData;
        const formList = await Promise.all(
          forms.map((form: string) => firebase.getDocData(FORMS, form))
        );
        promiseList = generatePromiseOfDeleteGroupWithForms(uid, groupId, formList);
      }

      await Promise.all(promiseList).catch(() => {
        throw new Error("刪除群組內部所有資料時發生錯誤");
      });

      res.status(200).json({
        status: "fail",
        status_code: 200,
        message: "成功刪除問卷的所有資料!",
      });
    } catch (error: any) {
      const { message } = error;
      res.status(400).json({
        status: "fail",
        status_code: 400,
        message,
      });
    }
  }
}
