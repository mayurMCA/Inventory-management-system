const MESSAGES = {
  resCode: {
    HTTP_OK: 200,
    HTTP_CREATE: 201,
    HTTP_NO_CONTENT: 204,
    HTTP_BAD_REQUEST: 400,
    HTTP_UNAUTHORIZED: 401,
    HTTP_FORBIDDEN: 403,
    HTTP_NOT_FOUND: 404,
    HTTP_METHOD_NOT_ALLOWED: 405,
    HTTP_CONFLICT: 409,
    HTTP_INTERNAL_SERVER_ERROR: 500,
    HTTP_SERVICE_UNAVAILABLE: 503,
  },
  errorTypes: {
    INTERNAL_SERVER_ERROR: "Internal Server Error",
  },
  apiErrorStrings: {
    SERVER_ERROR: "Oops! something went wrong",
    DATA_NOT_EXISTS: (data) => `${data} does not exists`,
    DATA_ALREADY_EXISTS: (data) => `${data} already exists`,
    INCORRECT_PASSWORD: "The entered password is incorrect!",
    OTP_EXPIRED: 'The OTP is either invalid or has been expired',
    INVALID_REQUEST:'Invalid Request'

  },
  apiSuccessStrings: {
    CREATE: (value) => `${value} Created Successfully`,
    UPDATE: (value) => `${value} Updated Successfully`,
    DELETE: (value) => `${value} Remove Successfully`,
    LOGIN: (value) => `${value} login Successfully`,
    OTP_SENT_SUCCESS: 'OTP sent successfully!',
    OTP_VERIFIED: 'OTP verified successfully',

  },
  emailStrings: {},
};

export default MESSAGES;
