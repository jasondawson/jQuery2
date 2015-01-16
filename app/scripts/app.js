$(document).ready(function(){

$('#newTaskForm').hide();

var listo = [];
var save = function() {
	localStorage.listo = JSON.stringify(listo);
};

var loadLocalStorage = function() {
		listo = JSON.parse(localStorage.listo);

		//TODO loop through listo and put objects back in the right html 'places'
		//can check with Jess's github repo
		for (var i = 0; i < listo.length; i++) {
			if (listo[i].id === 'new') {
                $('#newList').append('<a href="#" class="" id="item"><li class="list-group-item">' + listo[i].task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-arrow-right"></span></li></a>');
            } else if (listo[i].id === 'inProgress') {
                $('#currentList').append('<a href="#" class="" id="inProgress"><li class="list-group-item">' + listo[i].task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-arrow-right"></span></li></a>');
            } else if (listo[i].id === 'archived') {
            	$('#archivedList').append('<a href="#" class="" id="archived"><li class="list-group-item">' + listo[i].task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-trash"></span></li></a>');
            } else {
            	listo.splice(i, 1);
            }
		}

};

var Task = function(task) {
	this.task = task;
	this.id = 'new';
};
var addTask = function(task) {
	if(task) {
		task = new Task(task);
		listo.push(task);
		save();

		//clear form and add task to html
		$('#newItemInput').val('');
		$('#newList').append('<a href="#" class="" id="item"><li class="list-group-item">' + task.task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-arrow-right"></span></li></a>');

	}
	$('#newTaskForm, #newListItem').fadeToggle('fast', 'linear');
};

 var archiveToggle = function() {
 	var archivesExist = false;
 	for (var i = 0; i < listo.length; i++) {
    	if (listo[i].id === 'archived') {
    		archivesExist = true;
    		break;
    	};
    };

    if (archivesExist) {
    	$('.arch').show();
    } else {
    	$('.arch').hide();
    };
};

var advanceTask = function(task) {
    var modified = task.innerText.trim();
    for (var i = 0; i < listo.length; i++) {
        if (listo[i].task === modified) {
            if (listo[i].id === 'new') {
                listo[i].id = 'inProgress';
            } else if (listo[i].id === 'inProgress') {
                listo[i].id = 'archived';
            } else {
                listo.splice(i, 1);
            }
        	save();
            break;
        }
    }
    task.remove();
	archiveToggle(); 

};

if (localStorage.listo) {
	loadLocalStorage();
};
archiveToggle();

$('#saveNewItem').on('click', function(e) {
	e.preventDefault();
	var task = $('#newItemInput').val().trim();
	addTask(task);
});

//Opens form
$('#newListItem').on('click', function() {
	$('#newListItem').fadeToggle('fast', 'linear');
	$('#newTaskForm').fadeToggle('fast', 'linear');
});
//closes form
$('#cancel').on('click', function(e) {
	e.preventDefault();
	$('#newTaskForm, #newListItem').fadeToggle('fast', 'linear');
});

$(document).on('click', '#item', function(e) {
	e.preventDefault();
	var task = this;
	advanceTask(task);
	this.id = 'inProgress';
	$('#currentList').append(this.outerHTML);
});

$(document).on('click', '#inProgress', function(e) {
	e.preventDefault();
	var task = this;
	task.id = 'archived';
	var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-trash');
	advanceTask(task);
	$('#archivedList').append(changeIcon);
});

$(document).on('click', '#archived', function(e) {
	e.preventDefault();
	var task = this;
	advanceTask(task);
});


});