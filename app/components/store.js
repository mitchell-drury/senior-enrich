import {createStore, applyMiddleware} from 'redux';
import Thunk from 'redux-thunk';

const GOT_ALL_STUDENTS = 'GOT_ALL_STUDENTS';
const GOT_SINGLE_STUDENT = 'GOT_SINGLE_STUDENT';
const ADDED_STUDENT = 'ADDED_STUDENT';
const UPDATED_STUDENT = 'UPDATED_STUDENT';
const WRITE_STUDENT_NAME = 'WRITE_STUDENT_NAME';
const WRITE_STUDENT_EMAIL = 'WRITE_STUDENT_EMAIL';
const WRITE_STUDENT_CAMPUS = 'WRITE_STUDENT_CAMPUS';

const GOT_ALL_CAMPUSES = 'GET_ALL_CAMPUSES';
const GOT_SINGLE_CAMPUS = 'GOT_SINGLE_CAMPUS';
const ADDED_CAMPUS = 'ADDED_CAMPUS';
const UPDATED_CAMPUS =' UPDATED_CAMPUS';
const WRITE_CAMPUS_NAME = 'WRITE_CAMPUS_NAME';
const WRITE_CAMPUS_IMAGEPATH = 'WRITE_CAMPUS_IMAGEPATH';

const initialState = {
    studentList: [],
    campusList: [],
    currentCampusStudents: [],
    currentCampus: {},
    currentStudent: {},
    currentCampusName: '',
    currentCampusImagePath: '',
    currentStudentName: '',
    currentStudentEmail: '',
    currentStudentCampus: ''
}

function reducer (state = initialState, action) {
    switch (action.type) {
        case GOT_ALL_STUDENTS:
            return Object.assign({}, state, {studentList: action.studentList})
        case GOT_SINGLE_STUDENT:
            return Object.assign({}, state, {currentStudent: action.student})
        case ADDED_STUDENT:
            return Object.assign({}, state, {studentList: state.studentList.concat(action.student)});
        case UPDATED_STUDENT:
            return Object.assign({}, state, {currentStudent: action.student});
        case WRITE_STUDENT_NAME:
            return Object.assign({}, state, {currentStudentName: action.name});
        case WRITE_STUDENT_EMAIL:
            return Object.assign({}, state, {currentStudentEmail: action.email});
        case WRITE_STUDENT_CAMPUS:
            return Object.assign({}, state, {currentStudentCampus: action.campus});

        case GOT_ALL_CAMPUSES:
            return Object.assign({}, state, {campusList: action.campusList})
        case GOT_SINGLE_CAMPUS:
            return Object.assign({}, state, {currentCampus: action.campus}, {currentCampusStudents: action.campus.students})
        case ADDED_CAMPUS:
            return Object.assign({}, state, {campusList: state.campusList.concat(action.campus)});
        case UPDATED_CAMPUS:
            return Object.assign({}, state, {currentCampus: action.campus})
        case WRITE_CAMPUS_IMAGEPATH:
            return Object.assign({}, state, {currentCampusImagePath: action.imagePath})
        case WRITE_CAMPUS_NAME:
            return Object.assign({}, state, {currentCampusName: action.name})
        default:
            return state;
    }
}

export function gotAllStudents (studentList) {
    return {
        type: GOT_ALL_STUDENTS,
        studentList
    }
}

export function gotSingleStudent (student) {
    return {
        type: GOT_SINGLE_STUDENT,
        student
    }
}

export function addedStudent (student) {
    return {
        type: ADDED_STUDENT,
        student
    }
}

export function updatedStudent (student) {
    return {
        type: UPDATED_STUDENT,
        student
    }
}

export function writeStudentName (name) {
    return {
        type: WRITE_STUDENT_NAME,
        name
    }
}

export function writeStudentEmail (email) {
    return {
        type: WRITE_STUDENT_EMAIL,
        email
    }
}

export function writeStudentCampus (campus) {
    return {
        type: WRITE_STUDENT_CAMPUS,
        campus
    }
}

export function gotAllCampuses (campusList) {
    return {
        type: GOT_ALL_CAMPUSES,
        campusList
    }
}

export function gotSingleCampus (campus) {
    return {
        type: GOT_SINGLE_CAMPUS,
        campus
    }
}

export function addedCampus (campus) {
    return {
        type: ADDED_CAMPUS,
        campus
    }
}

export function updatedCampus (campus) {
    return {
        type: UPDATED_CAMPUS,
        campus
    }
}

export function writeCampusImagePath (imagePath) {
    return {
        type: WRITE_CAMPUS_IMAGEPATH,
        imagePath
    }
}

export function writeCampusName (name) {
    return {
        type: WRITE_CAMPUS_NAME,
        name
    }
}

const Store = createStore(reducer);
export default Store;
