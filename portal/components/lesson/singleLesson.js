apple.controller('singleLesson', ['$rootScope', '$scope', '$state', '$stateParams', '$http', '$q', 'userService', 'Upload', 'server',
    function ($rootScope, $scope, $state, $stateParams, $http, $q, userService, Upload, server) {
        $scope.lessonNum = $stateParams["lessonNum"];

        getStudentsAttendanceStatus();

        function getStudentsAttendanceStatus() {
            var data = {};
            data.lessonid = $stateParams["lessonId"];
            server.requestPhp(data, "GetStudentsAttendance").then(function (data) {
                $scope.students = data;
                /*
                  0 - attending
                  1 - late
                  2 - not attending
                  3 - didn't report yet
                */
            });
        }
    }]);
