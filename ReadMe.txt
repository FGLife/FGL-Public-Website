Steps to setup from scratch

1.) Install node.js which includes npm

2.) Install Git for windows from this address and pay attention to the details below
 Address: http://git-scm.com/download/win

 During install:
 - select windows explorer integration and leave the defaults
 - select use Git from the windows command prompt - important so that it will be added to the windows path and be accessible to npm etc.
 - leave everything else as is

3.) install yeoman, bower, and gulp globally
	Yeoman: npm install -g yo 
	Bower: npm install -g bower
	Gulp: npm install -g gulp

yeoman - web application scaffolding tool
Bower - dependency package manager
Gulp - task runner for common task automation

4.) install the gulp-webapp generator
	gulp-webapp: npm install --global generator-gulp-webapp

5.) install rimraf to avoid the issue with being unable to delete the node_modules directory on windows machines
 - npm install -g rimraf

6.) install required gulp packages
 - make sure that you are in the root directory of the GulpCanvas project c:\{yourPath}\CanvasGulp
 - delete the node_modules directory 
 	- rimraf node_modules
 	***do not have the directory you are rimraf(ing) open in windows explorer or you will get errors***
 	***closing all explorer windows should allow rimraf to work correctly***

7.) install the dependencies
 - npm install


Current setup requires 2 gulpFiles

**** The file included with this is the build gulp file

**** The one created by running yo gulp-webapp in an npm console is the development gulpfile

NOTES: 
***DO NOT CHECK THE NODE_MODULES DIRECTORY IN THE CANVASGULP FOLDER INTO SOURCE CONTROL***
***ONLY ONE GULPFILE CAN BE USED AT A TIME. RENAME THE ONE YOU ARE NOT USING WITH THE APPROPRIATE SUFFIX (ex. _build or _dev)***