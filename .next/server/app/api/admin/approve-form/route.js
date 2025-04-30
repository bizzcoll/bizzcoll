/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/admin/approve-form/route";
exports.ids = ["app/api/admin/approve-form/route"];
exports.modules = {

/***/ "(rsc)/./app/api/admin/approve-form/route.ts":
/*!*********************************************!*\
  !*** ./app/api/admin/approve-form/route.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n/* harmony import */ var _lib_supabaseAdmin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/supabaseAdmin */ \"(rsc)/./lib/supabaseAdmin.ts\");\n\n\n\nasync function POST(req) {\n    const { id, approve } = await req.json();\n    if (!id || typeof approve !== 'boolean') {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Missing or invalid parameters'\n        }, {\n            status: 400\n        });\n    }\n    try {\n        // ✅ עדכון טופס בטבלת registrationForm\n        const form = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].registrationForm.update({\n            where: {\n                id\n            },\n            data: {\n                reviewed: true,\n                approved: approve\n            }\n        });\n        // ✅ אם מאשרים – עדכון Supabase user_metadata\n        if (approve) {\n            const { data: usersPage, error: userError } = await _lib_supabaseAdmin__WEBPACK_IMPORTED_MODULE_2__[\"default\"].auth.admin.listUsers({\n                perPage: 1000\n            });\n            if (userError || !usersPage?.users) {\n                console.error('❌ שגיאה בשליפת רשימת יוזרים:', userError);\n                return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                    error: 'User fetch failed'\n                }, {\n                    status: 500\n                });\n            }\n            const user = usersPage.users.find((u)=>u.email === form.email);\n            if (!user) {\n                console.warn('⚠️ לא נמצא משתמש עם האימייל:', form.email);\n                return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                    error: 'User not found'\n                }, {\n                    status: 404\n                });\n            }\n            const updatedMetadata = {\n                ...user.user_metadata,\n                approved: true,\n                role: form.role,\n                full_name: form.fullName || form.businessName || 'משתמש ללא שם'\n            };\n            const { error: updateError } = await _lib_supabaseAdmin__WEBPACK_IMPORTED_MODULE_2__[\"default\"].auth.admin.updateUserById(user.id, {\n                user_metadata: updatedMetadata\n            });\n            if (updateError) {\n                console.error('❌ שגיאה בעדכון מטהדאטה:', updateError);\n                return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                    error: 'Failed to update user metadata'\n                }, {\n                    status: 500\n                });\n            }\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true\n        });\n    } catch (error) {\n        console.error('❌ שגיאה כללית באישור/דחייה:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Failed to approve/reject'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2FkbWluL2FwcHJvdmUtZm9ybS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQXVEO0FBQ3RCO0FBQ2M7QUFFeEMsZUFBZUcsS0FBS0MsR0FBZ0I7SUFDekMsTUFBTSxFQUFFQyxFQUFFLEVBQUVDLE9BQU8sRUFBRSxHQUFHLE1BQU1GLElBQUlHLElBQUk7SUFFdEMsSUFBSSxDQUFDRixNQUFNLE9BQU9DLFlBQVksV0FBVztRQUN2QyxPQUFPTixxREFBWUEsQ0FBQ08sSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBZ0MsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDckY7SUFFQSxJQUFJO1FBQ0Ysc0NBQXNDO1FBQ3RDLE1BQU1DLE9BQU8sTUFBTVQsbURBQU1BLENBQUNVLGdCQUFnQixDQUFDQyxNQUFNLENBQUM7WUFDaERDLE9BQU87Z0JBQUVSO1lBQUc7WUFDWlMsTUFBTTtnQkFDSkMsVUFBVTtnQkFDVkMsVUFBVVY7WUFDWjtRQUNGO1FBRUEsNkNBQTZDO1FBQzdDLElBQUlBLFNBQVM7WUFDWCxNQUFNLEVBQUVRLE1BQU1HLFNBQVMsRUFBRVQsT0FBT1UsU0FBUyxFQUFFLEdBQUcsTUFBTWhCLDBEQUFhQSxDQUFDaUIsSUFBSSxDQUFDQyxLQUFLLENBQUNDLFNBQVMsQ0FBQztnQkFDckZDLFNBQVM7WUFDWDtZQUVBLElBQUlKLGFBQWEsQ0FBQ0QsV0FBV00sT0FBTztnQkFDbENDLFFBQVFoQixLQUFLLENBQUMsZ0NBQWdDVTtnQkFDOUMsT0FBT2xCLHFEQUFZQSxDQUFDTyxJQUFJLENBQUM7b0JBQUVDLE9BQU87Z0JBQW9CLEdBQUc7b0JBQUVDLFFBQVE7Z0JBQUk7WUFDekU7WUFFQSxNQUFNZ0IsT0FBT1IsVUFBVU0sS0FBSyxDQUFDRyxJQUFJLENBQUMsQ0FBQ0MsSUFBTUEsRUFBRUMsS0FBSyxLQUFLbEIsS0FBS2tCLEtBQUs7WUFFL0QsSUFBSSxDQUFDSCxNQUFNO2dCQUNURCxRQUFRSyxJQUFJLENBQUMsZ0NBQWdDbkIsS0FBS2tCLEtBQUs7Z0JBQ3ZELE9BQU81QixxREFBWUEsQ0FBQ08sSUFBSSxDQUFDO29CQUFFQyxPQUFPO2dCQUFpQixHQUFHO29CQUFFQyxRQUFRO2dCQUFJO1lBQ3RFO1lBRUEsTUFBTXFCLGtCQUFrQjtnQkFDdEIsR0FBR0wsS0FBS00sYUFBYTtnQkFDckJmLFVBQVU7Z0JBQ1ZnQixNQUFNdEIsS0FBS3NCLElBQUk7Z0JBQ2ZDLFdBQVd2QixLQUFLd0IsUUFBUSxJQUFJeEIsS0FBS3lCLFlBQVksSUFBSTtZQUNuRDtZQUVBLE1BQU0sRUFBRTNCLE9BQU80QixXQUFXLEVBQUUsR0FBRyxNQUFNbEMsMERBQWFBLENBQUNpQixJQUFJLENBQUNDLEtBQUssQ0FBQ2lCLGNBQWMsQ0FBQ1osS0FBS3BCLEVBQUUsRUFBRTtnQkFDcEYwQixlQUFlRDtZQUNqQjtZQUVBLElBQUlNLGFBQWE7Z0JBQ2ZaLFFBQVFoQixLQUFLLENBQUMsMkJBQTJCNEI7Z0JBQ3pDLE9BQU9wQyxxREFBWUEsQ0FBQ08sSUFBSSxDQUFDO29CQUFFQyxPQUFPO2dCQUFpQyxHQUFHO29CQUFFQyxRQUFRO2dCQUFJO1lBQ3RGO1FBQ0Y7UUFFQSxPQUFPVCxxREFBWUEsQ0FBQ08sSUFBSSxDQUFDO1lBQUUrQixTQUFTO1FBQUs7SUFDM0MsRUFBRSxPQUFPOUIsT0FBTztRQUNkZ0IsUUFBUWhCLEtBQUssQ0FBQywrQkFBK0JBO1FBQzdDLE9BQU9SLHFEQUFZQSxDQUFDTyxJQUFJLENBQUM7WUFBRUMsT0FBTztRQUEyQixHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUNoRjtBQUNGIiwic291cmNlcyI6WyJEOlxcQml6ekNvbGxcXGFwcFxcYXBpXFxhZG1pblxcYXBwcm92ZS1mb3JtXFxyb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVxdWVzdCwgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInXHJcbmltcG9ydCBwcmlzbWEgZnJvbSAnQC9saWIvcHJpc21hJ1xyXG5pbXBvcnQgc3VwYWJhc2VBZG1pbiBmcm9tICdAL2xpYi9zdXBhYmFzZUFkbWluJ1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxOiBOZXh0UmVxdWVzdCkge1xyXG4gIGNvbnN0IHsgaWQsIGFwcHJvdmUgfSA9IGF3YWl0IHJlcS5qc29uKClcclxuXHJcbiAgaWYgKCFpZCB8fCB0eXBlb2YgYXBwcm92ZSAhPT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ01pc3Npbmcgb3IgaW52YWxpZCBwYXJhbWV0ZXJzJyB9LCB7IHN0YXR1czogNDAwIH0pXHJcbiAgfVxyXG5cclxuICB0cnkge1xyXG4gICAgLy8g4pyFINei15PXm9eV158g15jXldek16Eg15HXmNeR15zXqiByZWdpc3RyYXRpb25Gb3JtXHJcbiAgICBjb25zdCBmb3JtID0gYXdhaXQgcHJpc21hLnJlZ2lzdHJhdGlvbkZvcm0udXBkYXRlKHtcclxuICAgICAgd2hlcmU6IHsgaWQgfSxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIHJldmlld2VkOiB0cnVlLFxyXG4gICAgICAgIGFwcHJvdmVkOiBhcHByb3ZlLFxyXG4gICAgICB9LFxyXG4gICAgfSlcclxuXHJcbiAgICAvLyDinIUg15DXnSDXnteQ16nXqNeZ150g4oCTINei15PXm9eV158gU3VwYWJhc2UgdXNlcl9tZXRhZGF0YVxyXG4gICAgaWYgKGFwcHJvdmUpIHtcclxuICAgICAgY29uc3QgeyBkYXRhOiB1c2Vyc1BhZ2UsIGVycm9yOiB1c2VyRXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlQWRtaW4uYXV0aC5hZG1pbi5saXN0VXNlcnMoe1xyXG4gICAgICAgIHBlclBhZ2U6IDEwMDAsXHJcbiAgICAgIH0pXHJcblxyXG4gICAgICBpZiAodXNlckVycm9yIHx8ICF1c2Vyc1BhZ2U/LnVzZXJzKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcign4p2MINep15LXmdeQ15Qg15HXqdec15nXpNeqINeo16nXmdee16og15nXldeW16jXmdedOicsIHVzZXJFcnJvcilcclxuICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ1VzZXIgZmV0Y2ggZmFpbGVkJyB9LCB7IHN0YXR1czogNTAwIH0pXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHVzZXIgPSB1c2Vyc1BhZ2UudXNlcnMuZmluZCgodSkgPT4gdS5lbWFpbCA9PT0gZm9ybS5lbWFpbClcclxuXHJcbiAgICAgIGlmICghdXNlcikge1xyXG4gICAgICAgIGNvbnNvbGUud2Fybign4pqg77iPINec15Ag16DXntem15Ag157Xqdeq157XqSDXotedINeU15DXmdee15nXmdecOicsIGZvcm0uZW1haWwpXHJcbiAgICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdVc2VyIG5vdCBmb3VuZCcgfSwgeyBzdGF0dXM6IDQwNCB9KVxyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCB1cGRhdGVkTWV0YWRhdGEgPSB7XHJcbiAgICAgICAgLi4udXNlci51c2VyX21ldGFkYXRhLFxyXG4gICAgICAgIGFwcHJvdmVkOiB0cnVlLFxyXG4gICAgICAgIHJvbGU6IGZvcm0ucm9sZSxcclxuICAgICAgICBmdWxsX25hbWU6IGZvcm0uZnVsbE5hbWUgfHwgZm9ybS5idXNpbmVzc05hbWUgfHwgJ9ee16nXqtee16kg15zXnNeQINep150nLFxyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCB7IGVycm9yOiB1cGRhdGVFcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VBZG1pbi5hdXRoLmFkbWluLnVwZGF0ZVVzZXJCeUlkKHVzZXIuaWQsIHtcclxuICAgICAgICB1c2VyX21ldGFkYXRhOiB1cGRhdGVkTWV0YWRhdGEsXHJcbiAgICAgIH0pXHJcblxyXG4gICAgICBpZiAodXBkYXRlRXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCfinYwg16nXkteZ15DXlCDXkdei15PXm9eV158g157XmNeU15PXkNeY15Q6JywgdXBkYXRlRXJyb3IpXHJcbiAgICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdGYWlsZWQgdG8gdXBkYXRlIHVzZXIgbWV0YWRhdGEnIH0sIHsgc3RhdHVzOiA1MDAgfSlcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IHN1Y2Nlc3M6IHRydWUgfSlcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcign4p2MINep15LXmdeQ15Qg15vXnNec15nXqiDXkdeQ15nXqdeV16gv15PXl9eZ15nXlDonLCBlcnJvcilcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnRmFpbGVkIHRvIGFwcHJvdmUvcmVqZWN0JyB9LCB7IHN0YXR1czogNTAwIH0pXHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJwcmlzbWEiLCJzdXBhYmFzZUFkbWluIiwiUE9TVCIsInJlcSIsImlkIiwiYXBwcm92ZSIsImpzb24iLCJlcnJvciIsInN0YXR1cyIsImZvcm0iLCJyZWdpc3RyYXRpb25Gb3JtIiwidXBkYXRlIiwid2hlcmUiLCJkYXRhIiwicmV2aWV3ZWQiLCJhcHByb3ZlZCIsInVzZXJzUGFnZSIsInVzZXJFcnJvciIsImF1dGgiLCJhZG1pbiIsImxpc3RVc2VycyIsInBlclBhZ2UiLCJ1c2VycyIsImNvbnNvbGUiLCJ1c2VyIiwiZmluZCIsInUiLCJlbWFpbCIsIndhcm4iLCJ1cGRhdGVkTWV0YWRhdGEiLCJ1c2VyX21ldGFkYXRhIiwicm9sZSIsImZ1bGxfbmFtZSIsImZ1bGxOYW1lIiwiYnVzaW5lc3NOYW1lIiwidXBkYXRlRXJyb3IiLCJ1cGRhdGVVc2VyQnlJZCIsInN1Y2Nlc3MiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/admin/approve-form/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n// lib/prisma.ts\n\nconst prisma = global.prisma || new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nif (true) global.prisma = prisma;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGdCQUFnQjtBQUM2QjtBQUU3QyxNQUFNQyxTQUFTQyxPQUFPRCxNQUFNLElBQUksSUFBSUQsd0RBQVlBO0FBQ2hELElBQUlHLElBQXNDLEVBQUVELE9BQU9ELE1BQU0sR0FBR0E7QUFFNUQsaUVBQWVBLE1BQU1BLEVBQUEiLCJzb3VyY2VzIjpbIkQ6XFxCaXp6Q29sbFxcbGliXFxwcmlzbWEudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gbGliL3ByaXNtYS50c1xyXG5pbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tICdAcHJpc21hL2NsaWVudCdcclxuXHJcbmNvbnN0IHByaXNtYSA9IGdsb2JhbC5wcmlzbWEgfHwgbmV3IFByaXNtYUNsaWVudCgpXHJcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50JykgZ2xvYmFsLnByaXNtYSA9IHByaXNtYVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgcHJpc21hXHJcbiJdLCJuYW1lcyI6WyJQcmlzbWFDbGllbnQiLCJwcmlzbWEiLCJnbG9iYWwiLCJwcm9jZXNzIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.ts\n");

/***/ }),

/***/ "(rsc)/./lib/supabaseAdmin.ts":
/*!******************************!*\
  !*** ./lib/supabaseAdmin.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/supabase-js */ \"(rsc)/./node_modules/@supabase/supabase-js/dist/module/index.js\");\n// lib/supabaseAdmin.ts\n\nconst supabaseAdmin = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (supabaseAdmin);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvc3VwYWJhc2VBZG1pbi50cyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBLHVCQUF1QjtBQUM2QjtBQUVwRCxNQUFNQyxnQkFBZ0JELG1FQUFZQSxDQUNoQ0UsUUFBUUMsR0FBRyxDQUFDQyxZQUFZLEVBQ3hCRixRQUFRQyxHQUFHLENBQUNFLHlCQUF5QjtBQUd2QyxpRUFBZUosYUFBYUEsRUFBQSIsInNvdXJjZXMiOlsiRDpcXEJpenpDb2xsXFxsaWJcXHN1cGFiYXNlQWRtaW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gbGliL3N1cGFiYXNlQWRtaW4udHNcclxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSAnQHN1cGFiYXNlL3N1cGFiYXNlLWpzJ1xyXG5cclxuY29uc3Qgc3VwYWJhc2VBZG1pbiA9IGNyZWF0ZUNsaWVudChcclxuICBwcm9jZXNzLmVudi5TVVBBQkFTRV9VUkwhLFxyXG4gIHByb2Nlc3MuZW52LlNVUEFCQVNFX1NFUlZJQ0VfUk9MRV9LRVkhXHJcbilcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHN1cGFiYXNlQWRtaW5cclxuIl0sIm5hbWVzIjpbImNyZWF0ZUNsaWVudCIsInN1cGFiYXNlQWRtaW4iLCJwcm9jZXNzIiwiZW52IiwiU1VQQUJBU0VfVVJMIiwiU1VQQUJBU0VfU0VSVklDRV9ST0xFX0tFWSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/supabaseAdmin.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadmin%2Fapprove-form%2Froute&page=%2Fapi%2Fadmin%2Fapprove-form%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fapprove-form%2Froute.ts&appDir=D%3A%5CBizzColl%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CBizzColl&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadmin%2Fapprove-form%2Froute&page=%2Fapi%2Fadmin%2Fapprove-form%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fapprove-form%2Froute.ts&appDir=D%3A%5CBizzColl%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CBizzColl&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var D_BizzColl_app_api_admin_approve_form_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/admin/approve-form/route.ts */ \"(rsc)/./app/api/admin/approve-form/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/admin/approve-form/route\",\n        pathname: \"/api/admin/approve-form\",\n        filename: \"route\",\n        bundlePath: \"app/api/admin/approve-form/route\"\n    },\n    resolvedPagePath: \"D:\\\\BizzColl\\\\app\\\\api\\\\admin\\\\approve-form\\\\route.ts\",\n    nextConfigOutput,\n    userland: D_BizzColl_app_api_admin_approve_form_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhZG1pbiUyRmFwcHJvdmUtZm9ybSUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGYWRtaW4lMkZhcHByb3ZlLWZvcm0lMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZhZG1pbiUyRmFwcHJvdmUtZm9ybSUyRnJvdXRlLnRzJmFwcERpcj1EJTNBJTVDQml6ekNvbGwlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUQlM0ElNUNCaXp6Q29sbCZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDSztBQUNsRjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiRDpcXFxcQml6ekNvbGxcXFxcYXBwXFxcXGFwaVxcXFxhZG1pblxcXFxhcHByb3ZlLWZvcm1cXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2FkbWluL2FwcHJvdmUtZm9ybS9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2FkbWluL2FwcHJvdmUtZm9ybVwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvYWRtaW4vYXBwcm92ZS1mb3JtL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiRDpcXFxcQml6ekNvbGxcXFxcYXBwXFxcXGFwaVxcXFxhZG1pblxcXFxhcHByb3ZlLWZvcm1cXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadmin%2Fapprove-form%2Froute&page=%2Fapi%2Fadmin%2Fapprove-form%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fapprove-form%2Froute.ts&appDir=D%3A%5CBizzColl%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CBizzColl&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@prisma/client");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "punycode":
/*!***************************!*\
  !*** external "punycode" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("punycode");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@supabase","vendor-chunks/tr46","vendor-chunks/whatwg-url","vendor-chunks/webidl-conversions"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadmin%2Fapprove-form%2Froute&page=%2Fapi%2Fadmin%2Fapprove-form%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fapprove-form%2Froute.ts&appDir=D%3A%5CBizzColl%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CBizzColl&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();