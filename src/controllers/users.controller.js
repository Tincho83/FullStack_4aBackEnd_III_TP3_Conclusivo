import { usersService } from "../services/index.js"
import { CustomError } from "../utils/ErrorsHandlers/CustomError.js";
import { errorArgsUser } from "../utils/ErrorsHandlers/DataErrors.js";
import { ERROR_TYPES } from "../utils/ErrorsHandlers/EnumErrors.js";
import { ERROR_MESSAGES } from "../utils/ErrorsHandlers/ErrorMessages.js";
import mongoose from 'mongoose';
import { errorHandler } from "../middleware/ErrorsHandlers/errorHandler.js";
import { logger } from "../utils/utils.js";


const getAllUsers = async (req, res) => {

    req.logger.debug('> USERS Controller: Get All...');

    try {
        const users = await usersService.getAll();

        req.logger.debug(`> All Users listed.`);
        req.logger.info(`Users listed.\r\n`);

        res.send({ status: "success", payload: users })
    } catch (error) {
        req.logger.error(`${error.message}`);

        res.status(500).send({ status: "error", error: "Internal Server Error" });
    }
};


const getUser = async (req, res, next) => {

    try {
        const userId = req.params.uid;

        req.logger.debug(`> USERS Controller: Get By ID: ${userId}...`);

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            req.logger.debug(`> USERS Controller: Get By ID: Error en ID: ${userId}...`);
            req.logger.warning(`Invalid User.\r\n`);

            CustomError.createError("User ID Error", ERROR_MESSAGES.USER.INVALID_ID, { userId }, ERROR_TYPES.TIPO_DE_DATOS);
        }

        const user = await usersService.getUserById(userId);

        if (!user) {
            req.logger.debug(`> USERS Controller: Get By ID: ID ${userId} not found...`);
            req.logger.warning(`User not found.\r\n`);

            CustomError.createError("User Not Found", ERROR_MESSAGES.USER.USER_NOT_FOUND, { userId }, ERROR_TYPES.NOT_FOUND);
        }

        req.logger.debug(`> User ${userId} listed.`);
        req.logger.info(`User listed.\r\n`);

        res.send({ status: "success", payload: user })

    } catch (error) {

        return next(error);
    }
}


const addUser = async (req, res, next) => {
    try {
        let { first_name, last_name, email, role, password } = req.body;

        req.logger.debug('> USERS Controller: Create...');
        req.logger.debug(`> USER Controller: Create From Body: ${JSON.stringify(req.body, null, 5)}`);

        if (!first_name || !last_name || !email || !password) {
            CustomError.createError("Create User Error", ERROR_MESSAGES.USER.MISSING_FIELDS, errorArgsUser(req.body), ERROR_TYPES.ARGUMENTOS_INVALIDOS);
        }

        if (!first_name || !last_name) {
            CustomError.createError("Create User Error", ERROR_MESSAGES.USER.NAME_REQUIRED, errorArgsUser(req.body), ERROR_TYPES.ARGUMENTOS_INVALIDOS);
        }

        if (!email) {
            CustomError.createError("Create User Error", ERROR_MESSAGES.USER.EMAIL_REQUIRED, errorArgsUser(req.body), ERROR_TYPES.ARGUMENTOS_INVALIDOS);
        }

        if (!password) {
            CustomError.createError("Create User Error", ERROR_MESSAGES.USER.PASSWORD_REQUIRED, errorArgsUser(req.body), ERROR_TYPES.ARGUMENTOS_INVALIDOS);
        }

        const user = await usersService.getUserByEmail(email);

        if (user) {
            req.logger.debug(`> USERS Controller: Create: Existing mail ${email}...`);
            req.logger.info(`Existing mail.\r\n`);

            CustomError.createError("User already exist.", ERROR_MESSAGES.USER.USER_ALREADY_EXISTS, errorArgsUser({ email }), ERROR_TYPES.USER_ALREADY_EXISTS);
        }

        const result = await usersService.create({ first_name, last_name, email, role, password });

        req.logger.debug(`> User created: ${result}`);
        req.logger.info(`User created.\r\n`);

        res.send({ status: "success", payload: result })

    } catch (error) {

        return next(error);
    }
}


const updateUser = async (req, res, next) => {

    try {
        const { first_name, last_name, email, password } = req.body;
        const updateBody = req.body;
        const userId = req.params.uid;

        req.logger.debug(`> USERS Controller: Update ${userId}...`);

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            req.logger.debug(`> USERS Controller: Update: Error en ID: ${userId}...`);
            req.logger.warning(`Invalid User.`);

            CustomError.createError("User ID Error", ERROR_MESSAGES.USER.INVALID_ID, { userId }, ERROR_TYPES.TIPO_DE_DATOS);
        }

        if (!first_name || !last_name || !password) {
            req.logger.debug(`> USERS Controller: Update: Incomplete values for update. Please verify data... ${JSON.stringify(req.body, null, 5)}`);
            CustomError.createError("Update User Error", ERROR_MESSAGES.USER.MISSING_FIELDS, errorArgsUser(req.body), ERROR_TYPES.ARGUMENTOS_INVALIDOS);
        }

        if (!first_name || !last_name) {
            CustomError.createError("Update User Error", ERROR_MESSAGES.USER.NAME_REQUIRED, errorArgsUser(req.body), ERROR_TYPES.ARGUMENTOS_INVALIDOS);
        }

        if (!password) {
            CustomError.createError("Update User Error", ERROR_MESSAGES.USER.PASSWORD_REQUIRED, errorArgsUser(req.body), ERROR_TYPES.ARGUMENTOS_INVALIDOS);
        }

        const user = await usersService.getUserById(userId);
        if (!user) {
            req.logger.debug(`> USERS Controller: Update: ID ${userId} not found...`);
            req.logger.warning(`User not found.\r\n`);

            CustomError.createError("User Not Found", ERROR_MESSAGES.USER.USER_NOT_FOUND, { userId }, ERROR_TYPES.NOT_FOUND);
        }

        const result = await usersService.update(userId, updateBody);

        req.logger.debug(`> User updated: ${result}`);
        req.logger.info(`User updated.\r\n`);

        res.send({ status: "success", message: "User updated" })

    } catch (error) {


        return next(error);
    }
}


const deleteUser = async (req, res, next) => {

    try {
        const userId = req.params.uid;

        req.logger.debug(`> USERS Controller: Delete ${userId}...`);

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            req.logger.debug(`> USERS Controller: Delete: Error en ID: ${userId}...`);
            req.logger.warning(`User ID error.\r\n`);

            CustomError.createError("User ID Error", ERROR_MESSAGES.USER.INVALID_ID, { userId }, ERROR_TYPES.TIPO_DE_DATOS);
        }

        const user = await usersService.getUserById(userId);
        if (!user) {
            req.logger.debug(`> USERS Controller: Delete: ID ${userId} not found...`);
            req.logger.warning(`User not found.\r\n`);

            CustomError.createError("User Not Found", ERROR_MESSAGES.USER.USER_NOT_FOUND, { userId }, ERROR_TYPES.NOT_FOUND);
        }

        const result = await usersService.delete(userId);

        req.logger.debug(`> User deleted: ${result}`);
        req.logger.info(`User deleted.\r\n`);

        res.send({ status: "success", message: "User deleted" })
    } catch (error) {

        return next(error);
    }
}


export default {
    deleteUser,
    addUser,
    getAllUsers,
    getUser,
    updateUser
}