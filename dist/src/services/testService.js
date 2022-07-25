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
import testRepository from '../repositories/testRepository.js';
import categoryService from '../services/categoryService.js';
import disciplineService from '../services/disciplineService.js';
import teacherService from '../services/teacherService.js';
import teacherDisciplineService from './teacherDisciplneService.js';
function createTest(name, pdfUrl, teacherName, categoryName, disciplineName) {
    return __awaiter(this, void 0, void 0, function () {
        var data, createTestData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, findCreateTestData(teacherName, categoryName, disciplineName)];
                case 1:
                    data = _a.sent();
                    createTestData = __assign(__assign({}, data), { name: name, pdfUrl: pdfUrl });
                    return [4 /*yield*/, testRepository.insert(createTestData)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function findCreateTestData(teacherName, categoryName, disciplineName) {
    return __awaiter(this, void 0, void 0, function () {
        var teacher, category, discipline, teacherDiscipline, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, teacherService.getTeacherbyName(teacherName)];
                case 1:
                    teacher = _a.sent();
                    return [4 /*yield*/, categoryService.getCategorybyName(categoryName)];
                case 2:
                    category = _a.sent();
                    return [4 /*yield*/, disciplineService.getDisciplinebyName(disciplineName)];
                case 3:
                    discipline = _a.sent();
                    return [4 /*yield*/, teacherDisciplineService.getTeacherDisciplineService(teacher.id, discipline.id)];
                case 4:
                    teacherDiscipline = _a.sent();
                    data = {
                        categoryId: category.id,
                        teacherId: teacher.id,
                        disciplineId: discipline.id
                    };
                    return [2 /*return*/, data];
            }
        });
    });
}
export function getTestByTerms() {
    return __awaiter(this, void 0, void 0, function () {
        var result, terms;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testRepository.findByTerms()];
                case 1:
                    result = _a.sent();
                    terms = result.map(function (term) {
                        return {
                            number: term.number,
                            disciplines: term.Discipline.map(function (discipline) {
                                return separateTestsByCategory(discipline);
                            })
                        };
                    });
                    return [2 /*return*/, terms];
            }
        });
    });
}
function separateTestsByCategory(discipline) {
    var categories = [];
    var categoriesObj = {};
    var categoriesArr = [];
    discipline.Test.forEach(function (test) {
        if (!categories.includes(test.category.name))
            categories.push(test.category.name);
    });
    categories.forEach(function (category) {
        var testFiltered = discipline.Test.filter(function (test) {
            return test.category.name === category;
        });
        var testMaped = testFiltered.map(function (test) {
            return {
                name: test.name,
                pdfUrl: test.pdfUrl,
                teacher: test.Teacher.name
            };
        });
        categoriesObj = {
            name: category,
            tests: testMaped
        };
        categoriesArr.push(categoriesObj);
    });
    if (categoriesArr.length === 0) {
        return {
            name: discipline.name,
            categories: 'Não tem prova pra nenhuma categoria nessa disciplina'
        };
    }
    return { name: discipline.name, categories: categoriesArr };
}
export function getTestByTeachers() {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testRepository.findByTeachers()];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
var testService = { createTest: createTest, getTestByTerms: getTestByTerms, getTestByTeachers: getTestByTeachers };
export default testService;
