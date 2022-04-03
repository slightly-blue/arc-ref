// add project
// delete project
// rename project
// add citation
// delete citation
// modify citation 
// add style 
// modify style
// remove style 
const test_state = {
    "active_project": {
      index: undefined,
      name: undefined,
    },
		"projects": [
			{
				"project": "my-first-project",
				"references": [
          {
            title: undefined,
            type: undefined,
            authors: undefined,
            published_date: undefined,
            journal: undefined,
            publisher: undefined,
            volume_no: undefined,
            issue_no: undefined,
            pages_used: undefined,
            doi: undefined,
            database: undefined,
            URL: undefined,
            access_date: undefined,
          }
        ],
				"style": {}
			},
			{
				"project": "other project",
        "references": [],
				"style": {}
			}
		]
}

export default (state = {}, action) => {
  switch (action.type) {
    case "INIT":
      return {
        ...action.payload,
        //...state
      };
    case "SELECT_PROJECT": {
      let index =  state.projects.findIndex(obj => obj.project === action.payload);
      return {
        ...state,
        active_project: {
          index: index,
          name: state.projects[index].project
        }
      };
    }
    case "ADD_PROJECT":
      return {
        ...state,
        projects: [
          ...state.projects,
          action.payload,
        ],
      };
    case "DELETE_PROJECT":
      return {
        ...state
      };
    case "MODIFY_PROJECT":
      return {
        ...state
      };
    case "ADD_CITATION":
      return {
        ...state
      };
    case "DELETE_CITATION":
      return {
        ...state
      };
    case "MODIFY_CITATION":
      return {
        ...state
      };
    case "ADD_STYLE":
      return {
        ...state
      };
    case "DELETE_STYLE":
      return {
        ...state
      };
    case "MODIFY_STYLE":
      return {
        ...state
      };

    default:
      return state;
  }
  // TODO: Update electron-store after changes have been made 
  // return state;
};


// case "REGISTER":
//   return {
//     ...state,
//     inProgress: false,
//     errors: action.error ? action.payload.errors : null
//   };
// case "LOGIN_PAGE_UNLOADED":
// case "REGISTER_PAGE_UNLOADED":
//   return {};
// case "ASYNC_START":
//   if (action.subtype === "LOGIN" || action.subtype === "REGISTER") {
//     return { ...state, inProgress: true };
//   }
//   break;
// case "UPDATE_FIELD_AUTH":
//   return { ...state, [action.key]: action.value };