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
exports.id = "app/api/register/route";
exports.ids = ["app/api/register/route"];
exports.modules = {

/***/ "(rsc)/./app/api/register/route.ts":
/*!***********************************!*\
  !*** ./app/api/register/route.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_supabaseAdmin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/supabaseAdmin */ \"(rsc)/./lib/supabaseAdmin.ts\");\n/* harmony import */ var _lib_supabaseHelpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/supabaseHelpers */ \"(rsc)/./lib/supabaseHelpers.ts\");\n\n\n\nasync function POST(req) {\n    // 🛠️ הדפסות סביבה\n    console.log(\"🛠️ ENV בדיקה בתוך API route:\");\n    console.log(\"🌍 SUPABASE_URL:\", process.env.SUPABASE_URL);\n    console.log(\"🔐 SERVICE_ROLE:\", process.env.SUPABASE_SERVICE_ROLE_KEY?.slice(0, 10) + '...');\n    const { email, password, role, full_name } = await req.json();\n    console.log(\"🔁 נרשמים עם:\", {\n        email,\n        password,\n        role,\n        full_name\n    });\n    const validRoles = [\n        'INFLUENCER',\n        'DEAL_MAKER',\n        'ADMIN'\n    ];\n    if (!validRoles.includes(role)) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Invalid role'\n        }, {\n            status: 400\n        });\n    }\n    // ❗ חוסם הרשמת ADMIN דרך route רגיל\n    if (role === 'ADMIN') {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Cannot register as admin from this endpoint'\n        }, {\n            status: 403\n        });\n    }\n    const { data: usersResponse, error: fetchError } = await _lib_supabaseAdmin__WEBPACK_IMPORTED_MODULE_1__[\"default\"].auth.admin.listUsers();\n    if (fetchError) {\n        console.error('❌ שגיאה בשליפת יוזרים:', fetchError);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'שגיאה בבדיקה'\n        }, {\n            status: 500\n        });\n    }\n    const users = usersResponse?.users;\n    const exists = users.find((user)=>user.email === email);\n    if (exists) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'user_exists'\n        }, {\n            status: 409\n        });\n    }\n    const { data: newUser, error: signUpError } = await _lib_supabaseAdmin__WEBPACK_IMPORTED_MODULE_1__[\"default\"].auth.admin.createUser({\n        email,\n        password,\n        email_confirm: \"development\" !== 'production',\n        user_metadata: {\n            role,\n            full_name\n        }\n    });\n    // לוגים לבדיקת היוזר החדש\n    console.log(\"✅ יוזר חדש:\", newUser?.user);\n    console.error(\"❌ שגיאה:\", signUpError);\n    if (signUpError || !newUser?.user?.id) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: signUpError?.message || 'בעיה לא ידועה'\n        }, {\n            status: 500\n        });\n    }\n    await _lib_supabaseAdmin__WEBPACK_IMPORTED_MODULE_1__[\"default\"].auth.admin.updateUserById(newUser.user.id, {\n        user_metadata: {\n            role,\n            full_name\n        }\n    });\n    if (false) {}\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        success: true\n    }, {\n        status: 200\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3JlZ2lzdGVyL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBMEM7QUFDSztBQUNjO0FBR3RELGVBQWVHLEtBQUtDLEdBQVk7SUFDckMsbUJBQW1CO0lBQ25CQyxRQUFRQyxHQUFHLENBQUM7SUFDWkQsUUFBUUMsR0FBRyxDQUFDLG9CQUFvQkMsUUFBUUMsR0FBRyxDQUFDQyxZQUFZO0lBQ3hESixRQUFRQyxHQUFHLENBQUMsb0JBQW9CQyxRQUFRQyxHQUFHLENBQUNFLHlCQUF5QixFQUFFQyxNQUFNLEdBQUcsTUFBTTtJQUV0RixNQUFNLEVBQUVDLEtBQUssRUFBRUMsUUFBUSxFQUFFQyxJQUFJLEVBQUVDLFNBQVMsRUFBRSxHQUFHLE1BQU1YLElBQUlZLElBQUk7SUFDM0RYLFFBQVFDLEdBQUcsQ0FBQyxpQkFBaUI7UUFBRU07UUFBT0M7UUFBVUM7UUFBTUM7SUFBVTtJQUVoRSxNQUFNRSxhQUFhO1FBQUM7UUFBYztRQUFjO0tBQVE7SUFDeEQsSUFBSSxDQUFDQSxXQUFXQyxRQUFRLENBQUNKLE9BQU87UUFDOUIsT0FBT2QscURBQVlBLENBQUNnQixJQUFJLENBQUM7WUFBRUcsT0FBTztRQUFlLEdBQUc7WUFBRUMsUUFBUTtRQUFJO0lBQ3BFO0lBRUEsb0NBQW9DO0lBQ3BDLElBQUlOLFNBQVMsU0FBUztRQUNwQixPQUFPZCxxREFBWUEsQ0FBQ2dCLElBQUksQ0FBQztZQUFFRyxPQUFPO1FBQThDLEdBQUc7WUFBRUMsUUFBUTtRQUFJO0lBQ25HO0lBRUEsTUFBTSxFQUFFQyxNQUFNQyxhQUFhLEVBQUVILE9BQU9JLFVBQVUsRUFBRSxHQUFHLE1BQU10QiwwREFBYUEsQ0FBQ3VCLElBQUksQ0FBQ0MsS0FBSyxDQUFDQyxTQUFTO0lBQzNGLElBQUlILFlBQVk7UUFDZGxCLFFBQVFjLEtBQUssQ0FBQywwQkFBMEJJO1FBQ3hDLE9BQU92QixxREFBWUEsQ0FBQ2dCLElBQUksQ0FBQztZQUFFRyxPQUFPO1FBQWUsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDcEU7SUFFQSxNQUFNTyxRQUFRTCxlQUFlSztJQUM3QixNQUFNQyxTQUFTRCxNQUFNRSxJQUFJLENBQUMsQ0FBQ0MsT0FBU0EsS0FBS2xCLEtBQUssS0FBS0E7SUFDbkQsSUFBSWdCLFFBQVE7UUFDVixPQUFPNUIscURBQVlBLENBQUNnQixJQUFJLENBQUM7WUFBRUcsT0FBTztRQUFjLEdBQUc7WUFBRUMsUUFBUTtRQUFJO0lBQ25FO0lBRUEsTUFBTSxFQUFFQyxNQUFNVSxPQUFPLEVBQUVaLE9BQU9hLFdBQVcsRUFBRSxHQUFHLE1BQU0vQiwwREFBYUEsQ0FBQ3VCLElBQUksQ0FBQ0MsS0FBSyxDQUFDUSxVQUFVLENBQUM7UUFDdEZyQjtRQUNBQztRQUNBcUIsZUFBZTNCLGtCQUF5QjtRQUN4QzRCLGVBQWU7WUFBRXJCO1lBQU1DO1FBQVU7SUFDbkM7SUFFQSwwQkFBMEI7SUFDMUJWLFFBQVFDLEdBQUcsQ0FBQyxlQUFleUIsU0FBU0Q7SUFDcEN6QixRQUFRYyxLQUFLLENBQUMsWUFBWWE7SUFFMUIsSUFBSUEsZUFBZSxDQUFDRCxTQUFTRCxNQUFNTSxJQUFJO1FBQ3JDLE9BQU9wQyxxREFBWUEsQ0FBQ2dCLElBQUksQ0FDdEI7WUFBRUcsT0FBT2EsYUFBYUssV0FBVztRQUFnQixHQUNqRDtZQUFFakIsUUFBUTtRQUFJO0lBRWxCO0lBRUEsTUFBTW5CLDBEQUFhQSxDQUFDdUIsSUFBSSxDQUFDQyxLQUFLLENBQUNhLGNBQWMsQ0FBQ1AsUUFBUUQsSUFBSSxDQUFDTSxFQUFFLEVBQUU7UUFDN0RELGVBQWU7WUFBRXJCO1lBQU1DO1FBQVU7SUFDbkM7SUFFQSxJQUFJUixLQUFxQyxFQUFFLEVBVTFDO0lBRUQsT0FBT1AscURBQVlBLENBQUNnQixJQUFJLENBQUM7UUFBRXVCLFNBQVM7SUFBSyxHQUFHO1FBQUVuQixRQUFRO0lBQUk7QUFDNUQiLCJzb3VyY2VzIjpbIkQ6XFxCaXp6Q29sbFxcYXBwXFxhcGlcXHJlZ2lzdGVyXFxyb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcidcclxuaW1wb3J0IHN1cGFiYXNlQWRtaW4gZnJvbSAnQC9saWIvc3VwYWJhc2VBZG1pbidcclxuaW1wb3J0IHsgc2VuZFZlcmlmaWNhdGlvbkVtYWlsIH0gZnJvbSAnQC9saWIvc3VwYWJhc2VIZWxwZXJzJ1xyXG5pbXBvcnQgdHlwZSB7IFVzZXIgfSBmcm9tICdAc3VwYWJhc2Uvc3VwYWJhc2UtanMnXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXE6IFJlcXVlc3QpIHtcclxuICAvLyDwn5ug77iPINeU15PXpNeh15XXqiDXodeR15nXkdeUXHJcbiAgY29uc29sZS5sb2coXCLwn5ug77iPIEVOViDXkdeT15nXp9eUINeR16rXldeaIEFQSSByb3V0ZTpcIilcclxuICBjb25zb2xlLmxvZyhcIvCfjI0gU1VQQUJBU0VfVVJMOlwiLCBwcm9jZXNzLmVudi5TVVBBQkFTRV9VUkwpXHJcbiAgY29uc29sZS5sb2coXCLwn5SQIFNFUlZJQ0VfUk9MRTpcIiwgcHJvY2Vzcy5lbnYuU1VQQUJBU0VfU0VSVklDRV9ST0xFX0tFWT8uc2xpY2UoMCwgMTApICsgJy4uLicpXHJcblxyXG4gIGNvbnN0IHsgZW1haWwsIHBhc3N3b3JkLCByb2xlLCBmdWxsX25hbWUgfSA9IGF3YWl0IHJlcS5qc29uKClcclxuICBjb25zb2xlLmxvZyhcIvCflIEg16DXqNep157XmdedINei1506XCIsIHsgZW1haWwsIHBhc3N3b3JkLCByb2xlLCBmdWxsX25hbWUgfSlcclxuXHJcbiAgY29uc3QgdmFsaWRSb2xlcyA9IFsnSU5GTFVFTkNFUicsICdERUFMX01BS0VSJywgJ0FETUlOJ11cclxuICBpZiAoIXZhbGlkUm9sZXMuaW5jbHVkZXMocm9sZSkpIHtcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnSW52YWxpZCByb2xlJyB9LCB7IHN0YXR1czogNDAwIH0pXHJcbiAgfVxyXG5cclxuICAvLyDinZcg15fXldeh150g15TXqNep157XqiBBRE1JTiDXk9eo15ogcm91dGUg16jXkteZ15xcclxuICBpZiAocm9sZSA9PT0gJ0FETUlOJykge1xyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdDYW5ub3QgcmVnaXN0ZXIgYXMgYWRtaW4gZnJvbSB0aGlzIGVuZHBvaW50JyB9LCB7IHN0YXR1czogNDAzIH0pXHJcbiAgfVxyXG5cclxuICBjb25zdCB7IGRhdGE6IHVzZXJzUmVzcG9uc2UsIGVycm9yOiBmZXRjaEVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZUFkbWluLmF1dGguYWRtaW4ubGlzdFVzZXJzKClcclxuICBpZiAoZmV0Y2hFcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcign4p2MINep15LXmdeQ15Qg15HXqdec15nXpNeqINeZ15XXlteo15nXnTonLCBmZXRjaEVycm9yKVxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICfXqdeS15nXkNeUINeR15HXk9eZ16fXlCcgfSwgeyBzdGF0dXM6IDUwMCB9KVxyXG4gIH1cclxuXHJcbiAgY29uc3QgdXNlcnMgPSB1c2Vyc1Jlc3BvbnNlPy51c2VycyBhcyBVc2VyW11cclxuICBjb25zdCBleGlzdHMgPSB1c2Vycy5maW5kKCh1c2VyKSA9PiB1c2VyLmVtYWlsID09PSBlbWFpbClcclxuICBpZiAoZXhpc3RzKSB7XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ3VzZXJfZXhpc3RzJyB9LCB7IHN0YXR1czogNDA5IH0pXHJcbiAgfVxyXG5cclxuICBjb25zdCB7IGRhdGE6IG5ld1VzZXIsIGVycm9yOiBzaWduVXBFcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VBZG1pbi5hdXRoLmFkbWluLmNyZWF0ZVVzZXIoe1xyXG4gICAgZW1haWwsXHJcbiAgICBwYXNzd29yZCxcclxuICAgIGVtYWlsX2NvbmZpcm06IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicsXHJcbiAgICB1c2VyX21ldGFkYXRhOiB7IHJvbGUsIGZ1bGxfbmFtZSB9LFxyXG4gIH0pXHJcblxyXG4gIC8vINec15XXkteZ150g15zXkdeT15nXp9eqINeU15nXldeW16gg15TXl9eT16lcclxuICBjb25zb2xlLmxvZyhcIuKchSDXmdeV15bXqCDXl9eT16k6XCIsIG5ld1VzZXI/LnVzZXIpXHJcbiAgY29uc29sZS5lcnJvcihcIuKdjCDXqdeS15nXkNeUOlwiLCBzaWduVXBFcnJvcilcclxuXHJcbiAgaWYgKHNpZ25VcEVycm9yIHx8ICFuZXdVc2VyPy51c2VyPy5pZCkge1xyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICB7IGVycm9yOiBzaWduVXBFcnJvcj8ubWVzc2FnZSB8fCAn15HXoteZ15Qg15zXkCDXmdeT15XXoteUJyB9LFxyXG4gICAgICB7IHN0YXR1czogNTAwIH1cclxuICAgIClcclxuICB9XHJcblxyXG4gIGF3YWl0IHN1cGFiYXNlQWRtaW4uYXV0aC5hZG1pbi51cGRhdGVVc2VyQnlJZChuZXdVc2VyLnVzZXIuaWQsIHtcclxuICAgIHVzZXJfbWV0YWRhdGE6IHsgcm9sZSwgZnVsbF9uYW1lIH0sXHJcbiAgfSlcclxuXHJcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGF3YWl0IHNlbmRWZXJpZmljYXRpb25FbWFpbChlbWFpbClcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ+KaoO+4jyDXnteZ15nXnCDXkNeZ157XldeqINeg15vXqdecOicsIGVycm9yKVxyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgICAgeyBlcnJvcjogJ9eg15XXpteoINee16nXqtee16ksINeQ15og157XmdeZ15wg15DXmdee15XXqiDXoNeb16nXnCcgfSxcclxuICAgICAgICB7IHN0YXR1czogMjAwIH1cclxuICAgICAgKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgc3VjY2VzczogdHJ1ZSB9LCB7IHN0YXR1czogMjAwIH0pXHJcbn1cclxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsInN1cGFiYXNlQWRtaW4iLCJzZW5kVmVyaWZpY2F0aW9uRW1haWwiLCJQT1NUIiwicmVxIiwiY29uc29sZSIsImxvZyIsInByb2Nlc3MiLCJlbnYiLCJTVVBBQkFTRV9VUkwiLCJTVVBBQkFTRV9TRVJWSUNFX1JPTEVfS0VZIiwic2xpY2UiLCJlbWFpbCIsInBhc3N3b3JkIiwicm9sZSIsImZ1bGxfbmFtZSIsImpzb24iLCJ2YWxpZFJvbGVzIiwiaW5jbHVkZXMiLCJlcnJvciIsInN0YXR1cyIsImRhdGEiLCJ1c2Vyc1Jlc3BvbnNlIiwiZmV0Y2hFcnJvciIsImF1dGgiLCJhZG1pbiIsImxpc3RVc2VycyIsInVzZXJzIiwiZXhpc3RzIiwiZmluZCIsInVzZXIiLCJuZXdVc2VyIiwic2lnblVwRXJyb3IiLCJjcmVhdGVVc2VyIiwiZW1haWxfY29uZmlybSIsInVzZXJfbWV0YWRhdGEiLCJpZCIsIm1lc3NhZ2UiLCJ1cGRhdGVVc2VyQnlJZCIsInN1Y2Nlc3MiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/register/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/supabaseAdmin.ts":
/*!******************************!*\
  !*** ./lib/supabaseAdmin.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/supabase-js */ \"(rsc)/./node_modules/@supabase/supabase-js/dist/module/index.js\");\n// lib/supabaseAdmin.ts\n\nconst supabaseAdmin = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (supabaseAdmin);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvc3VwYWJhc2VBZG1pbi50cyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBLHVCQUF1QjtBQUM2QjtBQUVwRCxNQUFNQyxnQkFBZ0JELG1FQUFZQSxDQUNoQ0UsUUFBUUMsR0FBRyxDQUFDQyxZQUFZLEVBQ3hCRixRQUFRQyxHQUFHLENBQUNFLHlCQUF5QjtBQUd2QyxpRUFBZUosYUFBYUEsRUFBQSIsInNvdXJjZXMiOlsiRDpcXEJpenpDb2xsXFxsaWJcXHN1cGFiYXNlQWRtaW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gbGliL3N1cGFiYXNlQWRtaW4udHNcclxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSAnQHN1cGFiYXNlL3N1cGFiYXNlLWpzJ1xyXG5cclxuY29uc3Qgc3VwYWJhc2VBZG1pbiA9IGNyZWF0ZUNsaWVudChcclxuICBwcm9jZXNzLmVudi5TVVBBQkFTRV9VUkwhLFxyXG4gIHByb2Nlc3MuZW52LlNVUEFCQVNFX1NFUlZJQ0VfUk9MRV9LRVkhXHJcbilcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHN1cGFiYXNlQWRtaW5cclxuIl0sIm5hbWVzIjpbImNyZWF0ZUNsaWVudCIsInN1cGFiYXNlQWRtaW4iLCJwcm9jZXNzIiwiZW52IiwiU1VQQUJBU0VfVVJMIiwiU1VQQUJBU0VfU0VSVklDRV9ST0xFX0tFWSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/supabaseAdmin.ts\n");

/***/ }),

/***/ "(rsc)/./lib/supabaseHelpers.ts":
/*!********************************!*\
  !*** ./lib/supabaseHelpers.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   sendVerificationEmail: () => (/* binding */ sendVerificationEmail)\n/* harmony export */ });\n/* harmony import */ var _lib_supabaseAdmin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/lib/supabaseAdmin */ \"(rsc)/./lib/supabaseAdmin.ts\");\n\nasync function sendVerificationEmail(email) {\n    const { error } = await _lib_supabaseAdmin__WEBPACK_IMPORTED_MODULE_0__[\"default\"].auth.admin.inviteUserByEmail(email, {\n        redirectTo: `${\"http://localhost:3000\"}/verify-email`\n    });\n    if (error) {\n        console.error('❌ שגיאה בשליחת מייל אימות:', error);\n        throw new Error('invite_failed');\n    }\n    return true;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvc3VwYWJhc2VIZWxwZXJzLnRzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQStDO0FBRXhDLGVBQWVDLHNCQUFzQkMsS0FBYTtJQUN2RCxNQUFNLEVBQUVDLEtBQUssRUFBRSxHQUFHLE1BQU1ILDBEQUFhQSxDQUFDSSxJQUFJLENBQUNDLEtBQUssQ0FBQ0MsaUJBQWlCLENBQUNKLE9BQU87UUFDeEVLLFlBQVksR0FBR0MsdUJBQWdDLENBQUMsYUFBYSxDQUFDO0lBQ2hFO0lBRUEsSUFBSUwsT0FBTztRQUNUUSxRQUFRUixLQUFLLENBQUMsOEJBQThCQTtRQUM1QyxNQUFNLElBQUlTLE1BQU07SUFDbEI7SUFFQSxPQUFPO0FBQ1QiLCJzb3VyY2VzIjpbIkQ6XFxCaXp6Q29sbFxcbGliXFxzdXBhYmFzZUhlbHBlcnMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHN1cGFiYXNlQWRtaW4gZnJvbSAnQC9saWIvc3VwYWJhc2VBZG1pbidcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZW5kVmVyaWZpY2F0aW9uRW1haWwoZW1haWw6IHN0cmluZykge1xyXG4gIGNvbnN0IHsgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlQWRtaW4uYXV0aC5hZG1pbi5pbnZpdGVVc2VyQnlFbWFpbChlbWFpbCwge1xyXG4gICAgcmVkaXJlY3RUbzogYCR7cHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfQkFTRV9VUkx9L3ZlcmlmeS1lbWFpbGBcclxuICB9KVxyXG5cclxuICBpZiAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ+KdjCDXqdeS15nXkNeUINeR16nXnNeZ15fXqiDXnteZ15nXnCDXkNeZ157XldeqOicsIGVycm9yKVxyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdpbnZpdGVfZmFpbGVkJylcclxuICB9XHJcblxyXG4gIHJldHVybiB0cnVlXHJcbn1cclxuIl0sIm5hbWVzIjpbInN1cGFiYXNlQWRtaW4iLCJzZW5kVmVyaWZpY2F0aW9uRW1haWwiLCJlbWFpbCIsImVycm9yIiwiYXV0aCIsImFkbWluIiwiaW52aXRlVXNlckJ5RW1haWwiLCJyZWRpcmVjdFRvIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX0JBU0VfVVJMIiwiY29uc29sZSIsIkVycm9yIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/supabaseHelpers.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fregister%2Froute&page=%2Fapi%2Fregister%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fregister%2Froute.ts&appDir=D%3A%5CBizzColl%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CBizzColl&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fregister%2Froute&page=%2Fapi%2Fregister%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fregister%2Froute.ts&appDir=D%3A%5CBizzColl%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CBizzColl&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var D_BizzColl_app_api_register_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/register/route.ts */ \"(rsc)/./app/api/register/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/register/route\",\n        pathname: \"/api/register\",\n        filename: \"route\",\n        bundlePath: \"app/api/register/route\"\n    },\n    resolvedPagePath: \"D:\\\\BizzColl\\\\app\\\\api\\\\register\\\\route.ts\",\n    nextConfigOutput,\n    userland: D_BizzColl_app_api_register_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZyZWdpc3RlciUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGcmVnaXN0ZXIlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZyZWdpc3RlciUyRnJvdXRlLnRzJmFwcERpcj1EJTNBJTVDQml6ekNvbGwlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUQlM0ElNUNCaXp6Q29sbCZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDTjtBQUN2RTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiRDpcXFxcQml6ekNvbGxcXFxcYXBwXFxcXGFwaVxcXFxyZWdpc3RlclxcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvcmVnaXN0ZXIvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9yZWdpc3RlclwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvcmVnaXN0ZXIvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJEOlxcXFxCaXp6Q29sbFxcXFxhcHBcXFxcYXBpXFxcXHJlZ2lzdGVyXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fregister%2Froute&page=%2Fapi%2Fregister%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fregister%2Froute.ts&appDir=D%3A%5CBizzColl%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CBizzColl&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@supabase","vendor-chunks/tr46","vendor-chunks/whatwg-url","vendor-chunks/webidl-conversions"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fregister%2Froute&page=%2Fapi%2Fregister%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fregister%2Froute.ts&appDir=D%3A%5CBizzColl%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CBizzColl&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();