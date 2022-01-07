# DarkHorse
Equine Health App - Cal Poly Senior Project 2021-2022

Getting Started
Prerequisites
o	JavaScript
o	React
o	React Native
o	Expo

Setting up Development Environment
1.	Download Node version 12 or higher
2.	Install Expo CLI
a.	IOS: sudo npm i -g expo-cli
b.	Windows: npm i -g expo-cli as PowerShell administrator
c.	To check Expo version: expo-cli --version
3.	Install Expo Client on App Store or Google Play Store
4.	Download and Install Visual Studio Code
5.	Install Extensions (ctrl/cmd + shift + x)
a.	Search “react native” -> install “React Native Tools” and install “React-Native/React/Redux snippets”
b.	Search “prettier” -> install “Prettier – Code formatter”
c.	Search “material icon theme” -> install “Material Icon Theme”
6.	Update Settings
a.	IOS:
i.	Code -> Preferences -> Settings
ii.	Search “formatonsave” and enable “Format On Save” option
b.	Windows:
i.	File -> Preferences -> Settings
ii.	Search “formatonsave” and enable “Format On Save” option

Creating First App
1.	Open terminal and navigate to desired project directory
2.	Enter command - expo init <projectName>
3.	Choose “blank” template by pressing enter key
4.	Enter command - cd <projectName>
5.	Enter command - code .
6.	Navigate to file App.js
7.	At the top of App.js, insert on first line - import React from “react”;
Joining App Development:
1.	Clone Github repository: kobegatti/DarkHorse: Equine Health App - Cal Poly Senior Project 2021-2022 (github.com)
2.	Enter command – npm install in root directory
Running the App
1.	Open terminal and navigate to project directory
2.	Enter command – npm start or expo start
a.	In order to scan expo QR code on mobile device, use command expo start --tunnel
3.	(ctrl/cmd + click) on localhost address (i.e. – http://localhost:19002)
4.	Android –
a.	Press ‘a’ after expo start or npm run android
5.	IOS –
a.	Press ‘run IOS simulator in web developer tools’ or npm run ios

Setting up IOS Simulator
Windows – Snack Expo
IOS – Device or Snack Expo

Setting up Android Emulator
1.	Android Studio Emulator - Expo Documentation
2.	react native - Expo run on android emulator using windows 10 - Stack Overflow

Running on Hardware Device
Run apps on a hardware device  |  Android Developers
1.	On hardware device, enable USB debugging.
2.	Enter command- abd devices
3.	Enter command – adb -d for hardware
4.	Or Enter command – adb -a to check all 

Unit Testing – JEST
	Testing suite = <filename>.test.js
	Run all test suites: npm run test
	Run a specific test suite: npm test path/of/test/suite file.test.js
	
