var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import supertest from 'supertest';
import app from '../src/app.js';
import { prisma } from '../src/config/database.js';
import testFactory from './factories/testFactory.js';
import userFactory from './factories/userFactory.js';
beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$executeRaw(templateObject_1 || (templateObject_1 = __makeTemplateObject(["TRUNCATE TABLE tests"], ["TRUNCATE TABLE tests"])))];
            case 1:
                _a.sent();
                return [4 /*yield*/, prisma.$executeRaw(templateObject_2 || (templateObject_2 = __makeTemplateObject(["DELETE FROM users WHERE email = 'andre@gmail.com'"], ["DELETE FROM users WHERE email = 'andre@gmail.com'"])))];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
describe('Singup and signin', function () {
    it('given email and password, create user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var login, response, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    login = userFactory.createLogin();
                    return [4 /*yield*/, supertest(app).post("/sign-up").send(login)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(201);
                    return [4 /*yield*/, prisma.user.findFirst({
                            where: { email: login.email }
                        })];
                case 2:
                    user = _a.sent();
                    expect(user.email).toBe(login.email);
                    return [2 /*return*/];
            }
        });
    }); });
    it('given an invalid input, receive 422', function () { return __awaiter(void 0, void 0, void 0, function () {
        var login, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    login = userFactory.createLogin();
                    delete login.password;
                    return [4 /*yield*/, supertest(app).post("/sign-up").send(login)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(422);
                    return [2 /*return*/];
            }
        });
    }); });
    it('given valid email and password, receive token', function () { return __awaiter(void 0, void 0, void 0, function () {
        var login, user, response, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    login = userFactory.createLogin();
                    return [4 /*yield*/, userFactory.createUser(login)];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, supertest(app).post("/sign-in").send({
                            email: user.email,
                            password: user.plainPassword
                        })];
                case 2:
                    response = _a.sent();
                    token = response.body.token;
                    expect(token).not.toBeNull();
                    return [2 /*return*/];
            }
        });
    }); });
    it('given invalid password, receive 401', function () { return __awaiter(void 0, void 0, void 0, function () {
        var login, user, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    login = userFactory.createLogin();
                    user = userFactory.createUser(login);
                    return [4 /*yield*/, supertest(app)
                            .post("/sign-in")
                            .send(__assign(__assign({}, login), { password: '12345678' }))];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(401);
                    return [2 /*return*/];
            }
        });
    }); });
    it('given email and password already in use, fail to create user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var login, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    login = userFactory.createLogin();
                    return [4 /*yield*/, userFactory.createUser(login)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, supertest(app).post("/sign-up").send(login)];
                case 2:
                    response = _a.sent();
                    expect(response.statusCode).toBe(409);
                    return [2 /*return*/];
            }
        });
    }); });
    it('given wrong confirPassword, fail to create user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var login, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    login = userFactory.createLogin();
                    return [4 /*yield*/, supertest(app)
                            .post("/sign-up")
                            .send(__assign(__assign({}, login), { confirmPassword: 'invalidconfirmpassword' }))];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(422);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('Create Test', function () {
    it('create a test, receive 201', function () { return __awaiter(void 0, void 0, void 0, function () {
        var token, test, response, savedTest;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userFactory.loginAndReceiveToken()];
                case 1:
                    token = _a.sent();
                    test = testFactory.createTest();
                    return [4 /*yield*/, supertest(app)
                            .post('/test')
                            .send(test)
                            .set('Authorization', "Bearer ".concat(token))];
                case 2:
                    response = _a.sent();
                    expect(response.status).toBe(201);
                    return [4 /*yield*/, prisma.test.findFirst({
                            where: { name: test.name }
                        })];
                case 3:
                    savedTest = _a.sent();
                    expect(savedTest).not.toBeNull();
                    return [2 /*return*/];
            }
        });
    }); });
    it('create a test with a invalid token, receive 401', function () { return __awaiter(void 0, void 0, void 0, function () {
        var test, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    test = testFactory.createTest();
                    return [4 /*yield*/, supertest(app)
                            .post('/test')
                            .send(test)
                            .set('Authorization', "Bearer invalidtoken")];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(401);
                    return [2 /*return*/];
            }
        });
    }); });
    it('create a test with a invalid name, receive 422', function () { return __awaiter(void 0, void 0, void 0, function () {
        var token, test, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userFactory.loginAndReceiveToken()];
                case 1:
                    token = _a.sent();
                    test = testFactory.createTest();
                    return [4 /*yield*/, supertest(app)
                            .post('/test')
                            .send(__assign(__assign({}, test), { name: '' }))
                            .set('Authorization', "Bearer ".concat(token))];
                case 2:
                    response = _a.sent();
                    expect(response.status).toBe(422);
                    return [2 /*return*/];
            }
        });
    }); });
    it('create a test with a invalid url, receive 422', function () { return __awaiter(void 0, void 0, void 0, function () {
        var token, test, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userFactory.loginAndReceiveToken()];
                case 1:
                    token = _a.sent();
                    test = testFactory.createTest();
                    return [4 /*yield*/, supertest(app)
                            .post('/test')
                            .send(__assign(__assign({}, test), { pdfUrl: 'notaurl' }))
                            .set('Authorization', "Bearer ".concat(token))];
                case 2:
                    response = _a.sent();
                    expect(response.status).toBe(422);
                    return [2 /*return*/];
            }
        });
    }); });
    it('create a test with a teacher that is not in database, receive 404', function () { return __awaiter(void 0, void 0, void 0, function () {
        var token, test, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userFactory.loginAndReceiveToken()];
                case 1:
                    token = _a.sent();
                    test = testFactory.createTest();
                    return [4 /*yield*/, supertest(app)
                            .post('/test')
                            .send(__assign(__assign({}, test), { teacher: 'invalidteacher' }))
                            .set('Authorization', "Bearer ".concat(token))];
                case 2:
                    response = _a.sent();
                    expect(response.status).toBe(404);
                    return [2 /*return*/];
            }
        });
    }); });
    it('create a test with a category that is not in database, receive 404', function () { return __awaiter(void 0, void 0, void 0, function () {
        var token, test, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userFactory.loginAndReceiveToken()];
                case 1:
                    token = _a.sent();
                    test = testFactory.createTest();
                    return [4 /*yield*/, supertest(app)
                            .post('/test')
                            .send(__assign(__assign({}, test), { category: 'invalidcategory' }))
                            .set('Authorization', "Bearer ".concat(token))];
                case 2:
                    response = _a.sent();
                    expect(response.status).toBe(404);
                    return [2 /*return*/];
            }
        });
    }); });
    it('create a test with a discipline that is not in database, receive 404', function () { return __awaiter(void 0, void 0, void 0, function () {
        var token, test, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userFactory.loginAndReceiveToken()];
                case 1:
                    token = _a.sent();
                    test = testFactory.createTest();
                    return [4 /*yield*/, supertest(app)
                            .post('/test')
                            .send(__assign(__assign({}, test), { discipline: 'invaliddiscipline' }))
                            .set('Authorization', "Bearer ".concat(token))];
                case 2:
                    response = _a.sent();
                    expect(response.status).toBe(404);
                    return [2 /*return*/];
            }
        });
    }); });
    it('create a test with a discipline that is not correlated with teacher, receive 404', function () { return __awaiter(void 0, void 0, void 0, function () {
        var token, test, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userFactory.loginAndReceiveToken()];
                case 1:
                    token = _a.sent();
                    test = testFactory.createTest();
                    return [4 /*yield*/, supertest(app)
                            .post('/test')
                            .send(__assign(__assign({}, test), { discipline: 'Humildade' }))
                            .set('Authorization', "Bearer ".concat(token))];
                case 2:
                    response = _a.sent();
                    expect(response.status).toBe(404);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('Get Test by discipline', function () {
    it('given right token get tests by discipline, receive 200', function () { return __awaiter(void 0, void 0, void 0, function () {
        var token, test, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userFactory.loginAndReceiveToken()];
                case 1:
                    token = _a.sent();
                    test = testFactory.createTest();
                    return [4 /*yield*/, supertest(app)
                            .post('/tests')
                            .send(test)
                            .set('Authorization', "Bearer ".concat(token))];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, supertest(app)
                            .get('/tests/disciplines')
                            .set('Authorization', "Bearer ".concat(token))];
                case 3:
                    response = _a.sent();
                    expect(response.body).not.toBeNull();
                    expect(response.status).toEqual(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('get tests by discipline with no token, receive 401', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest(app).get('/tests/disciplines')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(401);
                    return [2 /*return*/];
            }
        });
    }); });
    it('get tests by discipline with a invalid token, receive status 401', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest(app)
                        .get('/tests/disciplines')
                        .set('Authorization', "Bearer invalidtoken")];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(401);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('Get Test by teacher', function () {
    it('given right token get tests by teacher, receive 200', function () { return __awaiter(void 0, void 0, void 0, function () {
        var token, test, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userFactory.loginAndReceiveToken()];
                case 1:
                    token = _a.sent();
                    test = testFactory.createTest();
                    return [4 /*yield*/, supertest(app)
                            .post('/tests')
                            .send(test)
                            .set('Authorization', "Bearer ".concat(token))];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, supertest(app)
                            .get('/tests/teachers')
                            .set('Authorization', "Bearer ".concat(token))];
                case 3:
                    response = _a.sent();
                    expect(response.body).not.toBeNull();
                    expect(response.status).toEqual(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('get tests by discipline with no token, receive 401', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest(app).get('/tests/teachers')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(401);
                    return [2 /*return*/];
            }
        });
    }); });
    it('get tests by discipline with a invalid token, receive status 401', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest(app)
                        .get('/tests/teachers')
                        .set('Authorization', "Bearer invalidtoken")];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(401);
                    return [2 /*return*/];
            }
        });
    }); });
});
afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
var templateObject_1, templateObject_2;
