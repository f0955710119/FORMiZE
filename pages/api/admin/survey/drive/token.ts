// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");
const Cors = require("cors");
import credentials from "../../../../../credentials.json";

const dotenv = require("dotenv");
dotenv.config();

const clientId = credentials.web.client_id;
const clientSecret = credentials.web.client_secret;
const redirectUri =
  process.env.NEXT_PUBLIC_ENV === "development"
    ? credentials.web.redirect_uris[1]
    : credentials.web.redirect_uris[0];

const oAuth2Client = new google.auth.OAuth2({
  clientId,
  clientSecret,
  redirectUri,
});

interface Data {
  status: string;
  status_code: number;
  message: string;
  data?: {
    uri?: string;
    token?: object;
  };
}

const cors = Cors({
  methods: ["GET", "HEAD"],
});

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
  fn: any
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await runMiddleware(req, res, cors);

  if (req.method === "POST") {
    if (req.body.code === null) {
      res.status(400).json({
        status: "fail",
        status_code: 400,
        message: "there is no code to access token",
      });
      return;
    }
    console.log(req.body.code);
    oAuth2Client.getToken(req.body.code, (error: any, token: any) => {
      if (error) {
        res.status(400).json({
          status: "fail",
          status_code: 400,
          message: "fail to get token",
        });

        return;
      }

      res.status(200).json({
        status: "success",
        status_code: 200,
        message: "get drive access successfully!",
        data: {
          token,
        },
      });
    });
  }
}
