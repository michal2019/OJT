apple.controller('singleLesson', ['$rootScope', '$scope', '$state', '$stateParams', '$http', '$q', 'userService', 'Upload', 'server',
    function ($rootScope, $scope, $state, $stateParams, $http, $q, userService, Upload, server) {

        $scope.statuses = [];
        $scope.GetStatuses = function () {
            var data={};
            server.requestPhp(data, "GetEnrollmentTags").then(function (data) {
                $scope.statuses = data;
            });
        }

        $scope.students=[];
        $scope.lessonNum = $stateParams["lessonNum"];
 
        getStudentsAttendanceStatus();

        function getStudentsAttendanceStatus() {
            var data = {};
            data.lessonid = $stateParams["lessonId"];
            server.requestPhp(data, "GetStudentsAttendance").then(function (data) {
                $scope.students = data;
            });
        }
        $scope.setAttendanceStatus = function(student, status) {
            student.attendanceStatus = status;
            var data = {};
            data.student=student;
            data.lessonid = $stateParams["lessonId"];
            if(student.checkstudentid==null)
            {
                server.requestPhp(data, "AddCheckStudentStatus").then(function(data) {
                });
            }
            else{
                student.attendanceStatus = status;
                server.requestPhp(data, "UpdateCheckStudentStatus").then(function(data) {
                });
            }
        };

        $scope.backToCoursePage = function () {
            $state.transitionTo('singleCourse', { courseId: $stateParams["courseId"] });
        }
    }]);
