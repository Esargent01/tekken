'use strict';

var app = angular.module('CharacterComparison', ['ngAnimate']);

app.factory('CharacterDatabase', function ($http){
	var service = {};
	var roster = 'js/roster.json';
	var thumbBase = 'img/roster/thumb/';
	var fullBase = 'img/roster/full/';

	service.getCharacter = function(){
		return $http.get(roster);
	};

	service.fullConstruct = function(){
		return fullBase;
	};

	service.thumbConstruct = function(){
		return thumbBase;
	};

	return service;
}).
factory('Controls', function(){
	var controls = {};
	controls.arrowBase = function(arrow){
		return 'img/controls/arrow-' + arrow + '.svg';
	};
	controls.buttonBase = function(button){
		return 'img/controls/playstation-' + button + '.svg';
	};
	return controls;
});

app.controller('Roster', function ($scope, CharacterDatabase, Controls){

	getCharacter();

	function getCharacter(){
		CharacterDatabase.getCharacter()
		  .then(function(data) {
		   	$scope.roster = data.data.roster.character;
		});
	};

	$scope.thumb = CharacterDatabase.thumbConstruct();
	$scope.full = CharacterDatabase.fullConstruct();

	 $scope.select= function(item) {
	    $scope.selectedItem = item; 
	 };

	 $scope.isActive = function(item) {
	    return $scope.selectedItem === item;
	 };

	 $scope.button = Controls.arrowBase('left');

});