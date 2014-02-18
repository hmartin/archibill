// Ionic Starter App, v0.9.20

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

var db = window.openDatabase("Checkbill", "1.0", "Checkbill Info", 200000);
angular.module('starter', ['ionic', 'starter.services', 'starter.controllers', 'starter.directives'])


.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

      .state('tab', {
          url: "/tab",
          abstract: true,
          templateUrl: "templates/tabs.html"
      })

      .state('tab.home', {
          url: '/home',
          views: {
              'main-tab': {
                  templateUrl: 'templates/home.html',
                  controller: 'home'
              }
          }
      })
      .state('tab.tips', {
          url: '/tips',
          views: {
              'main-tab': {
                  templateUrl: 'templates/tips.html',
                  controller: 'home'
              }
          }
      })
      .state('tab.choose', {
          url: '/choose/:iid',
          views: {
              'main-tab': {
                  templateUrl: 'templates/choose.html',
                  controller: 'home'
              }
          }
      })


      .state('tab.take', {
          url: '/take',
          views: {
              'main-tab': {
                  templateUrl: 'templates/home.html',
                  controller: 'take'
              }
          }
      })

      .state('tab.option', {
          url: '/option',
          views: {
              'main-tab': {
                  templateUrl: 'templates/option.html',
                  controller: 'option'
              }
          }
      })

      .state('tab.manage', {
          url: '/manage',
          views: {
              'main-tab': {
                  templateUrl: 'templates/manage.html',
                  controller: 'manage'
              }
          }
      })

      .state('like', {
          url: '/like',
          views: {
              'adopt-tab': {
                  templateUrl: 'templates/like.html'
              }
          }
      })

      .state('tab.about', {
          url: '/about',
          views: {
              'about-tab': {
                  templateUrl: 'templates/about.html'
              }
          }
      });

  $urlRouterProvider.otherwise('/tab/home');

});

