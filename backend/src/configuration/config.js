import env from "dotenv";
env.config();

export const CONSTANTS = {
  port: process.env.PORT,
  logLevel: process.env.LOG_LEVEL,
  nodeEnv: process.env.NODE_ENV,
  jwtSecret: process.env.JWT_SECRET,
  jwtAlgorithm: process.env.JWT_ALGORITHM,
  port2: process.env.PORT2,
  domainUrl: process.env.DOMAIN_URL,
  reqURL: process.env.REQ_URL,
  eWayToken: process.env.EWAY_TOKEN,
  employeePassword: process.env.EMPLOYEE_PASSWORD,
  CDNWebStatic: process.env.CDN_WEB_STATIC,
  environment: process.env.ENVIRONMENT,
  clientReqProtocol: process.env.CLIENT_REQUEST_PROTOCOL,
  adminHost: process.env.ADMIN_HOST,
  customerHost: process.env.CUSTOMER_HOST,
  jwtTimeoutDuration: process.env.JWT_TIMEOUT_DURATION,
  devDataBaseUrl: process.env.DEV_DATABASE_URL,
  // prodDatabaseUrl: process.env.PROD_DATABASE_URL,
  testDataBaseUrl: process.env.TEST_DATABASE_URL,
  email:{

  nodeMailerTransporterOptions: { 
    host: process.env.SMTP_HOST,
    port: 465,
    secure: true, 
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS, 
    },
    tls: { 
      rejectUnauthorized: false,
    },
  },
  from:process.env.EMAIL_USER,
}, 

 

};

export const DIR = ["./src/assets/productImages"];
