import { makeAutoObservable } from 'mobx'

class Mobx {
    constructor() {
        makeAutoObservable(this)
    }

    pageName = ''
    setPageName(name) { this.pageName = name }

    oneExercise = {}
    setonEExercise(Exercise) { this.oneExercise = Exercise }

    errorMessage = 'Произошла ошибка'
    setErrorMessage(message) { this.errorMessage = message }

    error = false
    setError(bool) { this.error = bool }

    loading = false
    setLoading(bool) { this.loading = bool }

    forgotpassword = false
    setForgotPassword(bool) { this.forgotpassword = bool }

    auth = false
    setAuth(bool) { this.auth = bool }

    user = {}
    setUser(user) { this.user = user }


    exercises = []
    setExercises(exercises) { this.exercises = exercises }

    exercisesSearch = []
    setExercisesSearch(exercisesSearch) { this.exercisesSearch = exercisesSearch }

    trainingPatterns = []
    setTrainingPatterns(trainingPatterns) { this.trainingPatterns = trainingPatterns }

    trainingPatternsSearch = []
    setTrainingPatternsSearch(trainingPatternsSearch) { this.trainingPatternsSearch = trainingPatternsSearch }

    trainingBelongs = []
    setTrainingBelongs(trainingBelongs) { this.trainingBelongs = trainingBelongs }

    testBelongs = []
    setTestBelongs(testBelongs) { this.testBelongs = testBelongs }

    consultations = []
    setConsultations(consultations) { this.consultations = consultations }

    consultationsConnections = []
    setConsultationsConnections(consultationsConnections) { this.consultationsConnections = consultationsConnections }

    testGroups = []
    setTestGroups(groups) { this.testGroups = groups }

    tests = []
    setTests(tests) { this.tests = tests }

    testsSearch = []
    setTestsSearch(testsSearch) { this.testsSearch = testsSearch }

    consultationWeekYear = 'Неделя'
    setConsultationWeekYear(type) { this.consultationWeekYear = type }

    popularPatterns = []
    setPopularPatterns(patterns) { this.popularPatterns = patterns }

    popularPatternsSearch = []
    setPopularPatternsSearch(patternsSearch) { this.popularPatternsSearch = patternsSearch }

    ExerciseGrpupss = []
    setExerciseGrpups(ExerciseGrpupss) { this.ExerciseGrpupss = ExerciseGrpupss }

    addPattern = false
    setAddPattern(bool) { this.addPattern = bool }

    addExercise = false
    setAddExercise(bool) { this.addExercise = bool }

    AddTests = false
    setAddTests(bool) { this.AddTests = bool }

    UpdateTests = false
    setUpdateTests(bool) { this.UpdateTests = bool }

    addComsultation = false
    setAddConsultation(bool) { this.addComsultation = bool }

    updatePattern = false
    setUpdatePattern(bool) { this.updatePattern = bool }

    updateTrainingPattern = false
    setUpdateTrainingPattern(bool) { this.updateTrainingPattern = bool }

    updateExercise = false
    setUpdateExercise(bool) { this.updateExercise = bool }

    patternDetails = false
    setPatternDetails(bool) { this.patternDetails = bool }

    trainongDetails = false
    setTrainongDetails(bool) { this.trainongDetails = bool }

    OnePattern = {}
    setOnePattern(pattern) { this.OnePattern = pattern }

    OneTrainingPattern = {}
    setOneTrainingPattern(TrainingPattern) { this.OneTrainingPattern = TrainingPattern }

    oneTest = {}
    setOneTest(test) { this.oneTest = test }

    exerciseDetails = false
    setExerciseDetails(bool) { this.exerciseDetails = bool }

    testDetails = false
    setTestDetails(bool) { this.testDetails = bool }

    restartTimer = false
    setRestartTimer() { this.restartTimer = !this.restartTimer }

    timerOnOff = false
    setTimerOnOff(bool) { this.timerOnOff = bool }

    users = []
    setUsers(users) { this.users = users }

    sportsmans = []
    setSportsmans(sportsmans) { this.sportsmans = sportsmans }

    sportsmansSearch = []
    setSportsmansSearch(sportsmansSearch) { this.sportsmansSearch = sportsmansSearch }

    treners = []
    setTreners(treners) { this.treners = treners }

    nutritions = []
    setNutritions(newNutritions) { this.nutritions = newNutritions }

    OneUser = {}
    setOneUser(OneUser) { this.OneUser = OneUser }

    updateUser = false
    setUpdateUser(bool) { this.updateUser = bool }

    addUser = false
    setAddUser(bool) { this.addUser = bool }

    addProgramm = true
    setAddProgramm(bool) { this.addProgramm = bool }

    dragValue = {}
    setDragValue(dragValue) { this.dragValue = dragValue }
    setDragValueDropId(id) { this.dragValue.forEach(element => {element.id = id}); }

    dragOnWeekExerciseValue = {}
    setDragOnWeekExerciseValue(dragValue) { this.dragOnWeekExerciseValue = dragValue }
    dragOnWeekExerciseFlag = false
    setDragOnWeekExerciseFlag(bool) { this.dragOnWeekExerciseFlag = bool }

    dragOnWeekNutritionValue = {}
    setDragOnWeekNutritionValue(dragValue) { this.dragOnWeekNutritionValue = dragValue }
    dragOnWeekNutritioneFlag = false
    setDragOnWeekNutritionFlag(bool) { this.dragOnWeekNutritionFlag = bool }

    dragOnWeekTextValue = {}
    setDragOnWeekTextValue(dragValue) { this.dragOnWeekTextValue = dragValue }
    dragOnWeekTextFlag = false
    setDragOnWeekTextFlag(bool) { this.dragOnWeekTextFlag = bool }

    dropValue = {}
    setDropValue(dropValue) { this.dropValue = dropValue }
    

    dragExersicesValue = {}
    setDragExersicesValue(dragExersicesValue) { this.dragExersicesValue = dragExersicesValue }
    setDragExersicesValueDropId(id) { this.dragExersicesValue.id = id }

    dragExersicesFlag = false
    setDragExersicesFlag(bool) { this.dragExersicesFlag = bool }

    dragFlag = false
    setDragFlag(bool) { this.dragFlag = bool }

    dragNutritionFlag = false
    setDragNutritionFlag(bool) { this.dragNutritionFlag = bool }

    dragTestsFlag = false
    setDragTestsFlag(bool) { this.dragTestsFlag = bool }

    dropExersicesValue = {}
    setDropExersicesValue(dropExersicesValue) { this.dropExersicesValue = dropExersicesValue }

    dropNutritionValue = {}
    setDropNutritionValue(dropNutritionValue) { this.dropNutritionValue = dropNutritionValue }

    dropAndDropArrayTraining = []
    setDropAndDropArrayTraining(dropAndDropArrayTraining) { this.dropAndDropArrayTraining = dropAndDropArrayTraining }

    finalExersiceArrayOnDragAndDrop = []
    setFinalExersiceArrayOnDragAndDrop(finalExersiceArrayOnDragAndDrop) { this.finalExersiceArrayOnDragAndDrop = finalExersiceArrayOnDragAndDrop }

    finalNutritionArrayOnDragAndDrop = []
    setFinalNutritionArrayOnDragAndDrop(finalNutritionArrayOnDragAndDrop) { this.finalNutritionArrayOnDragAndDrop = finalNutritionArrayOnDragAndDrop }

    finalTestsArrayOnDragAndDrop = []
    setFinalTestsArrayOnDragAndDrop(finalTestsArrayOnDragAndDrop) { this.finalTestsArrayOnDragAndDrop = finalTestsArrayOnDragAndDrop }

    finalUsersArrayOnDragAndDrop = []
    setFinalUsersArrayOnDragAndDrop(finalUsersArrayOnDragAndDrop) { this.finalUsersArrayOnDragAndDrop = finalUsersArrayOnDragAndDrop }

    dropAndDropArrayNutrition = {}
    setDropAndDropArrayNutrition(dropAndDropArrayNutrition) { this.dropAndDropArrayNutrition = dropAndDropArrayNutrition }
    setDropAndDropArrayNutritionDropId(id) { this.dropAndDropArrayNutrition.id = id }

    dropAndDropArrayTests = {}
    setDropAndDropArrayTests(dropAndDropArrayTests) { this.dropAndDropArrayTests = dropAndDropArrayTests }
    setDropAndDropArrayTestsDropId(id) { this.dropAndDropArrayTests.id = id }

    sportprogramms = []
    setSportprogramms(sportprogramms) { this.sportprogramms = sportprogramms }

    sportprogrammsSearch = []
    setSportprogrammsSearch(sportprogrammsSearch) { this.sportprogrammsSearch = sportprogrammsSearch }

    oneSprotProgramm = {}
    setOneSprotProgramm(oneSprotProgramm) { this.oneSprotProgramm = oneSprotProgramm }

    sportprogrammExersices = []
    setSportprogrammExersices(sportprogrammExersices) { this.sportprogrammExersices = sportprogrammExersices }

    sportprogrammTests = []
    setSportprogrammTests(sportprogrammTests) { this.sportprogrammTests = sportprogrammTests }

    sportprogrammNutritions = []
    setSportprogrammNutritions(sportprogrammNutritions) { this.sportprogrammNutritions = sportprogrammNutritions }

    sportprogrammUsers = []
    setSportprogrammUsers(sportprogrammUsers) { this.sportprogrammUsers = sportprogrammUsers }

    cardUpdateExercise = {}
    setCardUpdateExercise(card){this.cardUpdateExercise = card}
    cardUpdateExerciseFlag = false
    setCardUpdateExerciseFlag(bool){this.cardUpdateExerciseFlag = bool}


    journal = []
    setJournal(newJournal) { this.journal = newJournal }

    testFix = []
    setTestFix(newTestFix) { this.testFix = newTestFix }

    trainingFix = []
    setTrainingFix(newTrainingFix) { this.trainingFix = newTrainingFix }


    currentTraining = {}
    setCurrentTraining(newCurrentTraining) { this.currentTraining = newCurrentTraining }

    currentExercise = {}
    setCurrentExercise(newCurrentExercise) { this.currentExercise = newCurrentExercise }

    currentBelongExercise = {}
    setCurrentBelongExercise(newCurrentBelongExercise) { this.currentBelongExercise = newCurrentBelongExercise }

    currentTest = {}
    setCurrentTest(newCurrentTest) { this.currentTest = newCurrentTest }

    currentNutrition = {}
    setCurrentNutrition(newCurrentNutrition) { this.currentNutrition = newCurrentNutrition }


    currentDate = ''
    setCurrentDate(newDate){this.currentDate = newDate}

    comments = []
    setComments(newComments){this.comments = newComments}

    chats = []
    setChats(newChats){this.chats = newChats}

    currentChatID = 0
    setCurrentChatID(newId){this.currentChatID = newId}
    

}


export default new Mobx();