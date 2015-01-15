$(document).ready(function(){

$('#newTaskForm').hide();

$('.arch').hide();

var listo = [];
var Task = function(task) {
	this.task = task;
	this.id = 'new';
};
var addTask = function(task) {
	if(task) {
		task = new Task(task);
		listo.push(task);

		//clear form and add task to html
		$('#newItemInput').val('');
		$('#newList').append('<a href="#" class="" id="item"><li class="list-group-item">' + task.task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-arrow-right"></span></li></a>');

	}
	$('#newTaskForm, #newListItem').fadeToggle('fast', 'linear');
};

var advanceTask = function(task) {
    var modified = task.innerText.trim();
    var archivesExist = false;
    for (var i = 0; i < listo.length; i++) {
        if (listo[i].task === modified) {
            if (listo[i].id === 'new') {
                listo[i].id = 'inProgress';
            } else if (listo[i].id === 'inProgress') {
                listo[i].id = 'archived';
            } else {
                listo.splice(i, 1);
            }

            break;
        }
    }
    task.remove();

 
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