"use strict";
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
exports.__esModule = true;
var database_1 = require("../src/database");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var termsArr, categoriesArr, teachersArr, disciplinesArr, teachersDisciplinesArr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    termsArr = [
                        { number: 1 },
                        { number: 2 },
                        { number: 3 },
                        { number: 4 },
                        { number: 5 },
                        { number: 6 },
                    ];
                    return [4 /*yield*/, database_1.client.$transaction(termsArr.map(function (term) {
                            return database_1.client.term.upsert({ where: term, update: {}, create: term });
                        }))];
                case 1:
                    _a.sent();
                    categoriesArr = [
                        { name: "Projeto" },
                        { name: "Prática" },
                        { name: "Recuperação" },
                    ];
                    return [4 /*yield*/, database_1.client.$transaction(categoriesArr.map(function (category) {
                            return database_1.client.category.upsert({ where: category, update: {}, create: category });
                        }))];
                case 2:
                    _a.sent();
                    teachersArr = [{ name: "Diego Pinho" }, { name: "Bruna Hamori" }];
                    return [4 /*yield*/, database_1.client.$transaction(teachersArr.map(function (teacher) {
                            return database_1.client.teacher.upsert({ where: teacher, update: {}, create: teacher });
                        }))];
                case 3:
                    _a.sent();
                    disciplinesArr = [
                        { name: "HTML e CSS", termId: 1 },
                        { name: "JavaScript", termId: 2 },
                        { name: "React", termId: 3 },
                        { name: "Planejamento", termId: 2 },
                    ];
                    return [4 /*yield*/, database_1.client.$transaction(disciplinesArr.map(function (discipline) {
                            return database_1.client.discipline.upsert({
                                where: { name: discipline.name },
                                update: {},
                                create: discipline
                            });
                        }))];
                case 4:
                    _a.sent();
                    teachersDisciplinesArr = [
                        { teacherId: 1, disciplineId: 1 },
                        { teacherId: 2, disciplineId: 2 },
                        { teacherId: 2, disciplineId: 3 },
                        { teacherId: 1, disciplineId: 4 },
                    ];
                    return [4 /*yield*/, database_1.client.$transaction(teachersDisciplinesArr.map(function (teachersDiscipline) {
                            return database_1.client.teachersDisciplines.upsert({
                                where: {
                                    teacher_discipline: {
                                        teacherId: teachersDiscipline.teacherId,
                                        disciplineId: teachersDiscipline.disciplineId
                                    }
                                },
                                update: {},
                                create: teachersDiscipline
                            });
                        }))];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
main()["catch"](function (e) {
    console.log(e);
    process.exit(1);
})["finally"](function () {
    database_1.client.$disconnect();
});
