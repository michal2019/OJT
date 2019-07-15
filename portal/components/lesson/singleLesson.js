apple.controller('singleLesson', ['$rootScope', '$scope', '$state', '$stateParams', '$http', '$q', 'userService', 'Upload', 'server',
    function ($rootScope, $scope, $state, $stateParams, $http, $q, userService, Upload, server) {

        $scope.statuses = [];
        $scope.GetStatuses = function () {
            var data = {};
            server.requestPhp(data, "GetEnrollmentTags").then(function (data) {
                $scope.statuses = data;
            });
        }

        $scope.students = [];
        $scope.lessonNum = $stateParams["lessonNum"];

        getStudentsAttendanceStatus();

        function getStudentsAttendanceStatus() {
            var data = {};
            data.lessonid = $stateParams["lessonId"];
            server.requestPhp(data, "GetStudentsAttendance").then(function (data) {
                $scope.students = data;
            });
        }
        $scope.setAttendanceStatus = function (student, status) {
            var data = {};
            var async = $q.defer();
            student.attendanceStatus = status;
            // data.status = student.attendanceStatus;
            data.student = student;
            data.lessonid = $stateParams["lessonId"];
            console.log(data);
            if (student.checkstudentid == null) {
                server.requestPhp(data, 'AddCheckStudentStatus').then(function (data) {
                    console.log("Success in saving status");
                    async.resolve(data); // --> no data came back
                }, function (err) {
                    console.error(err);
                    async.reject(error);
                });
                return async.promise;
            } else {
                server.requestPhp(data, 'UpdateCheckStudentStatus').then(function (data) {
                    console.log("Success in saving status");
                    async.resolve(data); // --> no data came back
                }, function (err) {
                    console.error(err);
                    async.reject(error);
                });
                return async.promise;
            }
        }


        $scope.backToCoursePage = function () {
            $state.transitionTo('singleCourse', { courseId: $stateParams["courseId"] });
        }
    }]);
