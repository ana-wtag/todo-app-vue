import { jest } from "@jest/globals";
import constants from "@/plugins/constants";

export const todo = {
  namespaced: true,
  state: {
    todoList: [],
    taskId: "",
    loading: false,
    limit: constants.LIMIT,
    showForm: false,
    searchLoading: false,
    searchText: "",
    currentFilter: constants.ALL,
  },
  getters: {
    getTaskById: function () {
      return {
        completedIn:"1 minute",
        createdAt:new Date(),
        done:true,
        id:"5dc84c41-da03-4c2c-a5ed-42cfd2c030b7",
        loading:false,
        text:"dfdsfds"
      };
    },
    getCompletedTaskList: function () {
      return [
        {
            completedIn:"1 minute",
            createdAt: new Date(),
            done:true,
            id:"5dc84c41-da03-4c2c-a5ed-42cfd2c030b7",
            loading:false,
            text:"dfdsfds"
        }
      ]
    },
    getIncompletedTaskList: function () {
        return [
          {
              completedIn:null,
              createdAt:new Date(),
              done:false,
              id:"6650dbca-92de-4ffb-931d-d2d5ae40c6d4",
              loading:false,
              text:"1223232qwewq"
          }
        ]
      },
  },

  actions: {
    toggleSearchLoad: jest.fn(),
    resetSearch: jest.fn(),
    search: jest.fn(),
    setCurrentFilter: jest.fn(),
    addTask: jest.fn(),
    editTask: jest.fn(),
    removeTask: jest.fn(),
    showForm: jest.fn(),
    markDone: jest.fn(),
  },
};
