/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/List.js":
/*!*****************************!*\
  !*** ./src/modules/List.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _TaskManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TaskManager */ "./src/modules/TaskManager.js");


const List = (title, id) => {
  const tasks = [{ title: 1 }, { title: 2 }];
  const taskManager = (0,_TaskManager__WEBPACK_IMPORTED_MODULE_0__["default"])();

  const getTitle = () => title;
  const getId = () => id;
  const getTasks = () => tasks;

  const createTask = (title) => {
    return taskManager.createTask(tasks, title);
  };

  return { getTitle, getId, getTasks, createTask };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (List);


/***/ }),

/***/ "./src/modules/Project.js":
/*!********************************!*\
  !*** ./src/modules/Project.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const Project = () => {
  const lists = [];

  const getLists = () => lists;
  const addList = (list) => lists.push(list);

  return { getLists, addList };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Project);


/***/ }),

/***/ "./src/modules/TaskManager.js":
/*!************************************!*\
  !*** ./src/modules/TaskManager.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* 
  Each List will have a button that expands a Task input field
  Tasks will then be pushed to the List Task array
  CRUD
*/

const TaskManager = () => {
  const createTask = (taskList, title) => {
    taskList.push({
      id: crypto.randomUUID().slice(0, 8),
      title,
    });
    return taskList[taskList.length - 1];
  };

  return { createTask };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TaskManager);


/***/ }),

/***/ "./src/modules/UIHandler.js":
/*!**********************************!*\
  !*** ./src/modules/UIHandler.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _appendCustomElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./appendCustomElement.js */ "./src/modules/appendCustomElement.js");
/* harmony import */ var _List_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./List.js */ "./src/modules/List.js");
/* harmony import */ var _Project_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Project.js */ "./src/modules/Project.js");




const currentProject = (0,_Project_js__WEBPACK_IMPORTED_MODULE_2__["default"])();
const listStorage = currentProject.getLists();

const listElementsHandler = (() => {
  const input = document.querySelector("#list-input");

  const init = () => {
    // Replace with render function later
    // Bind list input
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();

        const title = e.target.value;
        const id = crypto.randomUUID().slice(0, 8);
        const newList = (0,_List_js__WEBPACK_IMPORTED_MODULE_1__["default"])(title, id);

        // Push list into database and update DOM
        currentProject.addList(newList);
        renderListElements([newList]);

        input.value = "";
      }
    });
  };

  const renderListElements = (lists) => {
    lists.forEach((list) => {
      const id = list.getId();
      const listDataId = `[data-id="${id}"]`;

      // Create and append all list elements
      // append(target, tagName, classList, textContent, attributes)
      (0,_appendCustomElement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(".list-container", "div", ["list"], undefined, [
        "data-id",
        id,
      ]);
      const listElement = document.querySelector(`[data-id="${id}"]`);
      (0,_appendCustomElement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(listDataId, "h2", undefined, list.getTitle());
      document
        .querySelector(listDataId)
        .appendChild(createTaskForm(listElement, list));
      (0,_appendCustomElement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(listDataId, "div", "task-container");
      const taskContainer = listElement.querySelector(".task-container");
      const taskElements = createTaskElements(list.getTasks());
      renderTaskElements(taskContainer, taskElements);
    });
  };

  const createTaskForm = (target, list) => {
    // Create form and append input
    const taskForm = document.createElement("form");
    taskForm.className = "task-form";
    const taskInput = document.createElement("input");
    taskInput.className = "task-input";
    taskForm.appendChild(taskInput);

    // Bind input listener to monitor task entries
    taskInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const title = e.target.value;
        // Create a new task entry
        const newTask = list.createTask(title);
        // Create and render task elements
        const taskElement = createTaskElements([newTask]);
        renderTaskElements(target, taskElement);

        taskInput.value = "";
      }
    });
    return taskForm;
  };

  const renderTaskElements = (target, tasks) => {
    tasks.forEach((task) => {
      target.appendChild(task);
    });
  };

  const createTaskElements = (tasks) => {
    return tasks.map((task) => {
      const div = document.createElement("div");
      div.className = "task";
      const p = document.createElement("p");
      p.textContent = task.title;
      div.appendChild(p);
      return div;
    });
  };

  return { init, renderListElements };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (listElementsHandler);


/***/ }),

/***/ "./src/modules/appendCustomElement.js":
/*!********************************************!*\
  !*** ./src/modules/appendCustomElement.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ appendCustomElement)
/* harmony export */ });
function appendCustomElement(
  target,
  tagName,
  classList,
  textContent,
  attributes
) {
  const targetElement = document.querySelector(target);
  const element = document.createElement(tagName);
  if (typeof classList === "string") {
    element.classList.add(classList);
  } else if (Array.isArray(classList)) {
    element.classList.add(...classList);
  }
  if (textContent) {
    element.textContent = textContent;
  }
  if (Array.isArray(attributes)) {
    const [attr, value] = attributes;
    element.setAttribute(attr, value);
  }
  targetElement.appendChild(element);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_TaskManager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/TaskManager.js */ "./src/modules/TaskManager.js");
/* harmony import */ var _modules_UIHandler_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/UIHandler.js */ "./src/modules/UIHandler.js");
/* harmony import */ var _modules_Project_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/Project.js */ "./src/modules/Project.js");




const currentProject = (0,_modules_Project_js__WEBPACK_IMPORTED_MODULE_2__["default"])();
const listStorage = currentProject.getLists();

const UI = _modules_UIHandler_js__WEBPACK_IMPORTED_MODULE_1__["default"];
UI.init();

// const ListUpdater = (() => {
//   const lists = document.querySelector(".lists");

//   const update = () => {
//     lists.innerHTML = "";
//     listStorage.forEach((list) => {
//       lists.innerHTML += `<li>${list.getTitle()}</li>`;
//     });
//   };
//   return { update };
// })();

// const ListRenderer = (() => {
//   const listContainer = document.querySelector(".list-container");

//   // Create list

//   // Pass in array of elements to be rendered in the list container
//   const render = (listArray) => {
//     listArray.forEach((list) => {});
//   };

//   render(listStorage);
// })();

const TaskCreator = (() => {})();

/* Now I want to link it to the UI
  Form Input to create a new List
  new List will contain an input to create a new Task
*/

/* Updating Task
  Form input in List
  Submit a new Task to listStorage[x].createTask(taskDetails);

*/

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBd0M7QUFDeEM7QUFDQTtBQUNBLG1CQUFtQixVQUFVLElBQUksVUFBVTtBQUMzQyxzQkFBc0Isd0RBQVc7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxpRUFBZSxJQUFJLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ2pCcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxpRUFBZSxPQUFPLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ1R2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsaUVBQWUsV0FBVyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsQmdDO0FBQzlCO0FBQ007QUFDbkM7QUFDQSx1QkFBdUIsdURBQU87QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixvREFBSTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLEdBQUc7QUFDekM7QUFDQTtBQUNBO0FBQ0EsTUFBTSxtRUFBbUI7QUFDekI7QUFDQTtBQUNBO0FBQ0EsOERBQThELEdBQUc7QUFDakUsTUFBTSxtRUFBbUI7QUFDekI7QUFDQTtBQUNBO0FBQ0EsTUFBTSxtRUFBbUI7QUFDekI7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsQ0FBQztBQUNEO0FBQ0EsaUVBQWUsbUJBQW1CLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ2xHcEI7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDdEJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ05tRDtBQUNKO0FBQ0o7QUFDM0M7QUFDQSx1QkFBdUIsK0RBQU87QUFDOUI7QUFDQTtBQUNBLFdBQVcsNkRBQVM7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxnQkFBZ0I7QUFDbkQsUUFBUTtBQUNSO0FBQ0EsY0FBYztBQUNkLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb3AtdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvTGlzdC5qcyIsIndlYnBhY2s6Ly9vcC10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9Qcm9qZWN0LmpzIiwid2VicGFjazovL29wLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL1Rhc2tNYW5hZ2VyLmpzIiwid2VicGFjazovL29wLXRvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL1VJSGFuZGxlci5qcyIsIndlYnBhY2s6Ly9vcC10b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9hcHBlbmRDdXN0b21FbGVtZW50LmpzIiwid2VicGFjazovL29wLXRvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcC10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29wLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29wLXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29wLXRvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVGFza01hbmFnZXIgZnJvbSBcIi4vVGFza01hbmFnZXJcIjtcclxuXHJcbmNvbnN0IExpc3QgPSAodGl0bGUsIGlkKSA9PiB7XHJcbiAgY29uc3QgdGFza3MgPSBbeyB0aXRsZTogMSB9LCB7IHRpdGxlOiAyIH1dO1xyXG4gIGNvbnN0IHRhc2tNYW5hZ2VyID0gVGFza01hbmFnZXIoKTtcclxuXHJcbiAgY29uc3QgZ2V0VGl0bGUgPSAoKSA9PiB0aXRsZTtcclxuICBjb25zdCBnZXRJZCA9ICgpID0+IGlkO1xyXG4gIGNvbnN0IGdldFRhc2tzID0gKCkgPT4gdGFza3M7XHJcblxyXG4gIGNvbnN0IGNyZWF0ZVRhc2sgPSAodGl0bGUpID0+IHtcclxuICAgIHJldHVybiB0YXNrTWFuYWdlci5jcmVhdGVUYXNrKHRhc2tzLCB0aXRsZSk7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHsgZ2V0VGl0bGUsIGdldElkLCBnZXRUYXNrcywgY3JlYXRlVGFzayB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGlzdDtcclxuIiwiY29uc3QgUHJvamVjdCA9ICgpID0+IHtcclxuICBjb25zdCBsaXN0cyA9IFtdO1xyXG5cclxuICBjb25zdCBnZXRMaXN0cyA9ICgpID0+IGxpc3RzO1xyXG4gIGNvbnN0IGFkZExpc3QgPSAobGlzdCkgPT4gbGlzdHMucHVzaChsaXN0KTtcclxuXHJcbiAgcmV0dXJuIHsgZ2V0TGlzdHMsIGFkZExpc3QgfTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFByb2plY3Q7XHJcbiIsIi8qIFxyXG4gIEVhY2ggTGlzdCB3aWxsIGhhdmUgYSBidXR0b24gdGhhdCBleHBhbmRzIGEgVGFzayBpbnB1dCBmaWVsZFxyXG4gIFRhc2tzIHdpbGwgdGhlbiBiZSBwdXNoZWQgdG8gdGhlIExpc3QgVGFzayBhcnJheVxyXG4gIENSVURcclxuKi9cclxuXHJcbmNvbnN0IFRhc2tNYW5hZ2VyID0gKCkgPT4ge1xyXG4gIGNvbnN0IGNyZWF0ZVRhc2sgPSAodGFza0xpc3QsIHRpdGxlKSA9PiB7XHJcbiAgICB0YXNrTGlzdC5wdXNoKHtcclxuICAgICAgaWQ6IGNyeXB0by5yYW5kb21VVUlEKCkuc2xpY2UoMCwgOCksXHJcbiAgICAgIHRpdGxlLFxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gdGFza0xpc3RbdGFza0xpc3QubGVuZ3RoIC0gMV07XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHsgY3JlYXRlVGFzayB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVGFza01hbmFnZXI7XHJcbiIsImltcG9ydCBhcHBlbmRDdXN0b21FbGVtZW50IGZyb20gXCIuL2FwcGVuZEN1c3RvbUVsZW1lbnQuanNcIjtcclxuaW1wb3J0IExpc3QgZnJvbSBcIi4vTGlzdC5qc1wiO1xyXG5pbXBvcnQgUHJvamVjdCBmcm9tIFwiLi9Qcm9qZWN0LmpzXCI7XHJcblxyXG5jb25zdCBjdXJyZW50UHJvamVjdCA9IFByb2plY3QoKTtcclxuY29uc3QgbGlzdFN0b3JhZ2UgPSBjdXJyZW50UHJvamVjdC5nZXRMaXN0cygpO1xyXG5cclxuY29uc3QgbGlzdEVsZW1lbnRzSGFuZGxlciA9ICgoKSA9PiB7XHJcbiAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xpc3QtaW5wdXRcIik7XHJcblxyXG4gIGNvbnN0IGluaXQgPSAoKSA9PiB7XHJcbiAgICAvLyBSZXBsYWNlIHdpdGggcmVuZGVyIGZ1bmN0aW9uIGxhdGVyXHJcbiAgICAvLyBCaW5kIGxpc3QgaW5wdXRcclxuICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChlKSA9PiB7XHJcbiAgICAgIGlmIChlLmtleSA9PT0gXCJFbnRlclwiKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICBjb25zdCB0aXRsZSA9IGUudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgIGNvbnN0IGlkID0gY3J5cHRvLnJhbmRvbVVVSUQoKS5zbGljZSgwLCA4KTtcclxuICAgICAgICBjb25zdCBuZXdMaXN0ID0gTGlzdCh0aXRsZSwgaWQpO1xyXG5cclxuICAgICAgICAvLyBQdXNoIGxpc3QgaW50byBkYXRhYmFzZSBhbmQgdXBkYXRlIERPTVxyXG4gICAgICAgIGN1cnJlbnRQcm9qZWN0LmFkZExpc3QobmV3TGlzdCk7XHJcbiAgICAgICAgcmVuZGVyTGlzdEVsZW1lbnRzKFtuZXdMaXN0XSk7XHJcblxyXG4gICAgICAgIGlucHV0LnZhbHVlID0gXCJcIjtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgcmVuZGVyTGlzdEVsZW1lbnRzID0gKGxpc3RzKSA9PiB7XHJcbiAgICBsaXN0cy5mb3JFYWNoKChsaXN0KSA9PiB7XHJcbiAgICAgIGNvbnN0IGlkID0gbGlzdC5nZXRJZCgpO1xyXG4gICAgICBjb25zdCBsaXN0RGF0YUlkID0gYFtkYXRhLWlkPVwiJHtpZH1cIl1gO1xyXG5cclxuICAgICAgLy8gQ3JlYXRlIGFuZCBhcHBlbmQgYWxsIGxpc3QgZWxlbWVudHNcclxuICAgICAgLy8gYXBwZW5kKHRhcmdldCwgdGFnTmFtZSwgY2xhc3NMaXN0LCB0ZXh0Q29udGVudCwgYXR0cmlidXRlcylcclxuICAgICAgYXBwZW5kQ3VzdG9tRWxlbWVudChcIi5saXN0LWNvbnRhaW5lclwiLCBcImRpdlwiLCBbXCJsaXN0XCJdLCB1bmRlZmluZWQsIFtcclxuICAgICAgICBcImRhdGEtaWRcIixcclxuICAgICAgICBpZCxcclxuICAgICAgXSk7XHJcbiAgICAgIGNvbnN0IGxpc3RFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtaWQ9XCIke2lkfVwiXWApO1xyXG4gICAgICBhcHBlbmRDdXN0b21FbGVtZW50KGxpc3REYXRhSWQsIFwiaDJcIiwgdW5kZWZpbmVkLCBsaXN0LmdldFRpdGxlKCkpO1xyXG4gICAgICBkb2N1bWVudFxyXG4gICAgICAgIC5xdWVyeVNlbGVjdG9yKGxpc3REYXRhSWQpXHJcbiAgICAgICAgLmFwcGVuZENoaWxkKGNyZWF0ZVRhc2tGb3JtKGxpc3RFbGVtZW50LCBsaXN0KSk7XHJcbiAgICAgIGFwcGVuZEN1c3RvbUVsZW1lbnQobGlzdERhdGFJZCwgXCJkaXZcIiwgXCJ0YXNrLWNvbnRhaW5lclwiKTtcclxuICAgICAgY29uc3QgdGFza0NvbnRhaW5lciA9IGxpc3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1jb250YWluZXJcIik7XHJcbiAgICAgIGNvbnN0IHRhc2tFbGVtZW50cyA9IGNyZWF0ZVRhc2tFbGVtZW50cyhsaXN0LmdldFRhc2tzKCkpO1xyXG4gICAgICByZW5kZXJUYXNrRWxlbWVudHModGFza0NvbnRhaW5lciwgdGFza0VsZW1lbnRzKTtcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGNyZWF0ZVRhc2tGb3JtID0gKHRhcmdldCwgbGlzdCkgPT4ge1xyXG4gICAgLy8gQ3JlYXRlIGZvcm0gYW5kIGFwcGVuZCBpbnB1dFxyXG4gICAgY29uc3QgdGFza0Zvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKTtcclxuICAgIHRhc2tGb3JtLmNsYXNzTmFtZSA9IFwidGFzay1mb3JtXCI7XHJcbiAgICBjb25zdCB0YXNrSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICB0YXNrSW5wdXQuY2xhc3NOYW1lID0gXCJ0YXNrLWlucHV0XCI7XHJcbiAgICB0YXNrRm9ybS5hcHBlbmRDaGlsZCh0YXNrSW5wdXQpO1xyXG5cclxuICAgIC8vIEJpbmQgaW5wdXQgbGlzdGVuZXIgdG8gbW9uaXRvciB0YXNrIGVudHJpZXNcclxuICAgIHRhc2tJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZSkgPT4ge1xyXG4gICAgICBpZiAoZS5rZXkgPT09IFwiRW50ZXJcIikge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBjb25zdCB0aXRsZSA9IGUudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgIC8vIENyZWF0ZSBhIG5ldyB0YXNrIGVudHJ5XHJcbiAgICAgICAgY29uc3QgbmV3VGFzayA9IGxpc3QuY3JlYXRlVGFzayh0aXRsZSk7XHJcbiAgICAgICAgLy8gQ3JlYXRlIGFuZCByZW5kZXIgdGFzayBlbGVtZW50c1xyXG4gICAgICAgIGNvbnN0IHRhc2tFbGVtZW50ID0gY3JlYXRlVGFza0VsZW1lbnRzKFtuZXdUYXNrXSk7XHJcbiAgICAgICAgcmVuZGVyVGFza0VsZW1lbnRzKHRhcmdldCwgdGFza0VsZW1lbnQpO1xyXG5cclxuICAgICAgICB0YXNrSW5wdXQudmFsdWUgPSBcIlwiO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiB0YXNrRm9ybTtcclxuICB9O1xyXG5cclxuICBjb25zdCByZW5kZXJUYXNrRWxlbWVudHMgPSAodGFyZ2V0LCB0YXNrcykgPT4ge1xyXG4gICAgdGFza3MuZm9yRWFjaCgodGFzaykgPT4ge1xyXG4gICAgICB0YXJnZXQuYXBwZW5kQ2hpbGQodGFzayk7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICBjb25zdCBjcmVhdGVUYXNrRWxlbWVudHMgPSAodGFza3MpID0+IHtcclxuICAgIHJldHVybiB0YXNrcy5tYXAoKHRhc2spID0+IHtcclxuICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgZGl2LmNsYXNzTmFtZSA9IFwidGFza1wiO1xyXG4gICAgICBjb25zdCBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgICAgIHAudGV4dENvbnRlbnQgPSB0YXNrLnRpdGxlO1xyXG4gICAgICBkaXYuYXBwZW5kQ2hpbGQocCk7XHJcbiAgICAgIHJldHVybiBkaXY7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICByZXR1cm4geyBpbml0LCByZW5kZXJMaXN0RWxlbWVudHMgfTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxpc3RFbGVtZW50c0hhbmRsZXI7XHJcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFwcGVuZEN1c3RvbUVsZW1lbnQoXHJcbiAgdGFyZ2V0LFxyXG4gIHRhZ05hbWUsXHJcbiAgY2xhc3NMaXN0LFxyXG4gIHRleHRDb250ZW50LFxyXG4gIGF0dHJpYnV0ZXNcclxuKSB7XHJcbiAgY29uc3QgdGFyZ2V0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcclxuICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWdOYW1lKTtcclxuICBpZiAodHlwZW9mIGNsYXNzTGlzdCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTGlzdCk7XHJcbiAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGNsYXNzTGlzdCkpIHtcclxuICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCguLi5jbGFzc0xpc3QpO1xyXG4gIH1cclxuICBpZiAodGV4dENvbnRlbnQpIHtcclxuICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSB0ZXh0Q29udGVudDtcclxuICB9XHJcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXR0cmlidXRlcykpIHtcclxuICAgIGNvbnN0IFthdHRyLCB2YWx1ZV0gPSBhdHRyaWJ1dGVzO1xyXG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoYXR0ciwgdmFsdWUpO1xyXG4gIH1cclxuICB0YXJnZXRFbGVtZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFRhc2tNYW5hZ2VyIGZyb20gXCIuL21vZHVsZXMvVGFza01hbmFnZXIuanNcIjtcclxuaW1wb3J0IFVpTWFuYWdlciBmcm9tIFwiLi9tb2R1bGVzL1VJSGFuZGxlci5qc1wiO1xyXG5pbXBvcnQgUHJvamVjdCBmcm9tIFwiLi9tb2R1bGVzL1Byb2plY3QuanNcIjtcclxuXHJcbmNvbnN0IGN1cnJlbnRQcm9qZWN0ID0gUHJvamVjdCgpO1xyXG5jb25zdCBsaXN0U3RvcmFnZSA9IGN1cnJlbnRQcm9qZWN0LmdldExpc3RzKCk7XHJcblxyXG5jb25zdCBVSSA9IFVpTWFuYWdlcjtcclxuVUkuaW5pdCgpO1xyXG5cclxuLy8gY29uc3QgTGlzdFVwZGF0ZXIgPSAoKCkgPT4ge1xyXG4vLyAgIGNvbnN0IGxpc3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5saXN0c1wiKTtcclxuXHJcbi8vICAgY29uc3QgdXBkYXRlID0gKCkgPT4ge1xyXG4vLyAgICAgbGlzdHMuaW5uZXJIVE1MID0gXCJcIjtcclxuLy8gICAgIGxpc3RTdG9yYWdlLmZvckVhY2goKGxpc3QpID0+IHtcclxuLy8gICAgICAgbGlzdHMuaW5uZXJIVE1MICs9IGA8bGk+JHtsaXN0LmdldFRpdGxlKCl9PC9saT5gO1xyXG4vLyAgICAgfSk7XHJcbi8vICAgfTtcclxuLy8gICByZXR1cm4geyB1cGRhdGUgfTtcclxuLy8gfSkoKTtcclxuXHJcbi8vIGNvbnN0IExpc3RSZW5kZXJlciA9ICgoKSA9PiB7XHJcbi8vICAgY29uc3QgbGlzdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubGlzdC1jb250YWluZXJcIik7XHJcblxyXG4vLyAgIC8vIENyZWF0ZSBsaXN0XHJcblxyXG4vLyAgIC8vIFBhc3MgaW4gYXJyYXkgb2YgZWxlbWVudHMgdG8gYmUgcmVuZGVyZWQgaW4gdGhlIGxpc3QgY29udGFpbmVyXHJcbi8vICAgY29uc3QgcmVuZGVyID0gKGxpc3RBcnJheSkgPT4ge1xyXG4vLyAgICAgbGlzdEFycmF5LmZvckVhY2goKGxpc3QpID0+IHt9KTtcclxuLy8gICB9O1xyXG5cclxuLy8gICByZW5kZXIobGlzdFN0b3JhZ2UpO1xyXG4vLyB9KSgpO1xyXG5cclxuY29uc3QgVGFza0NyZWF0b3IgPSAoKCkgPT4ge30pKCk7XHJcblxyXG4vKiBOb3cgSSB3YW50IHRvIGxpbmsgaXQgdG8gdGhlIFVJXHJcbiAgRm9ybSBJbnB1dCB0byBjcmVhdGUgYSBuZXcgTGlzdFxyXG4gIG5ldyBMaXN0IHdpbGwgY29udGFpbiBhbiBpbnB1dCB0byBjcmVhdGUgYSBuZXcgVGFza1xyXG4qL1xyXG5cclxuLyogVXBkYXRpbmcgVGFza1xyXG4gIEZvcm0gaW5wdXQgaW4gTGlzdFxyXG4gIFN1Ym1pdCBhIG5ldyBUYXNrIHRvIGxpc3RTdG9yYWdlW3hdLmNyZWF0ZVRhc2sodGFza0RldGFpbHMpO1xyXG5cclxuKi9cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9