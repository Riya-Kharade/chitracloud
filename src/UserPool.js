import { CognitoUserPool } from "amazon-cognito-identity-js";
import { poolData } from "./awsConfig";

const UserPool = new CognitoUserPool(poolData);

export default UserPool;