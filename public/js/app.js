App = Ember.Application.create();

App.Router.map(function() {
	this.resource('about');
	this.resource('posts', function() {
		this.resource('post', { path: ':post_id' });	
		this.route('new');
	});
	this.resource('home', { path: '/' });
	
});

// App.ApplicationAdapter = DS.FixtureAdapter.extend();
App.Store = DS.Store.extend({
	revision: 4,
	adapter: DS.FixtureAdapter
});


App.Post = DS.Model.extend({
	title: DS.attr('string'),
	author: DS.attr('string'),
	date: DS.attr('date'),
	excerpt: DS.attr('string'),
	body: DS.attr('string')
});

App.Post.FIXTURES = [
	{
		id: 1,
		title: 'Ruby on Rails',
		author: 'Matt',
		date: new Date('24-07-2014'),
		excerpt: 'This is a brief tutorial on Rails',
		body: "Rails is a web application framework running on the Ruby programming language. If you have no prior experience with Ruby, you will find a very steep learning curve diving straight into Rails."
	},
	{
		id: 2,
		title: 'Ember JS',
		author: 'Matt',
		date: new Date('24-07-2014'),
		excerpt: 'This is a brief tutorial on Ember JS',
		body: "Ember makes Handlebars templates even better, by ensuring your HTML stays up-to-date when the underlying model changes. To get started, you don't even need to write any JavaScript."
	},
	{
		id: 3,
		title: 'Angular JS',
		author: 'Matt',
		date: new Date('24-07-2014'),
		excerpt: 'This is a brief tutorial on Angular JS',
		body: "AngularJS is an open-source web application framework, maintained by Google and community, that assists with creating single-page applications, one-page web applications that only require HTML, CSS, and JavaScript on the client side."
	}
];

App.CustomView = Ember.View.extend({
	templateName: 'custom',
	cvalue: 'This is some custom text typed inside the view'
});

App.PostsRoute = Ember.Route.extend({
	model: function() {
		return this.store.findAll('post');
	}
});

App.PostsController = Ember.ArrayController.extend({
	sortProperties: ['id'],
	sortAscending: true
});

App.PostRoute = Ember.Route.extend({
	model: function(params) {
		return this.store.find('post', params.post_id);
	}
});

App.PostController = Ember.ObjectController.extend({
	isEditing: false,

	actions: {
		edit: function() {
			this.set('isEditing', true);
		},
		doneEditing: function() {
			this.set('isEditing', false);
		}
	}
});


// App.PostsNewRoute = Ember.Route.extend({
// 	model: function() {
// 		var post = this.store.createRecord('post', {
// 			title: '',
// 			author: '',
// 			date: '',
// 			excerpt: '',
// 			body: ''
// 		});
// 		return post;
// 	}
// });

App.PostsNewController = Ember.ObjectController.extend({
	actions: {
		createPost: function() {
			
			var title = this.get('title');
			var authorName = this.get('author');
			var date = this.get('date');
			var excerpt = this.get('excerpt');
			var body = this.get('body');
			// var post = this.get('model');
			var message = 'The entered model is: <br/>' + 'Name: ' + authorName + '<br/>' + 'Date: ' + date + '<br/>' + 'Excerpt: ' + excerpt + '<br/>' + 'Body: ' + body;
			alertify.set({ labels: { 
				ok: 'Accept',
				cancel: 'Deny'
			 },
			 	buttonReverse: 'true'
			  });
			alertify.confirm(message, function(e) {
				if(e) {
					
					// var transaction = this.store.transaction();
					// var post = this.store.createRecord('post', {
					// 	title: title,
					// 	author: authorName,
					// 	date: date,
					// 	excerpt: excerpt,
					// 	body: body
					// });
					// post.save();
					// transaction.commit();
					
					alertify.success('Record added successfully');
				}
				else {
					// post.rollback();
					alertify.error('Operation aborted');
				}
			});
			this.set('new_title', '');
			this.set('new_authorName', '');
			this.set('new_date', '');
			this.set('new_excerpt', '');
			this.set('new_body', '');
			this.transitionToRoute('posts');
		}
	}
});



Ember.Handlebars.helper('format-date', function(date) {
	return moment(date).fromNow();
});

Ember.Handlebars.helper('format-title', function(title) {
	return title.toUpperCase();
});

var showdown = new Showdown.converter();

Ember.Handlebars.helper('format-markdown', function(input) {
	return new Handlebars.SafeString(showdown.makeHtml(input));
});



// var posts = [{
// 	id: '1',
// 	title: 'Rails is Omakase',
// 	author: { name: 'd2h' },
// 	date: new Date('07-22-2014'),
// 	excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et pulvinar tellus. Vivamus cursus eu sapien eu rhoncus. In fermentum odio a sapien elementum, sit amet luctus arcu volutpat. Integer cursus elementum libero nec tempor. Phasellus imperdiet orci ligula, id condimentum nibh imperdiet eu.',
// 	body: 'Aliquam euismod facilisis nunc, nec accumsan nulla suscipit quis. Etiam pulvinar rutrum sagittis? Mauris vitae eleifend nunc.'
// }, {
// 	id: '2',
// 	title: 'The Parley Letter',
// 	author: { name: 'd2h' },
// 	date: new Date('12-24-2012'),
// 	excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et pulvinar tellus. Vivamus cursus eu sapien eu rhoncus. In fermentum odio a sapien elementum, sit amet luctus arcu volutpat. Integer cursus elementum libero nec tempor. Phasellus imperdiet orci ligula, id condimentum nibh imperdiet eu.',
// 	body: 'Aliquam euismod facilisis nunc, nec accumsan nulla suscipit quis. Etiam pulvinar rutrum sagittis? Mauris vitae eleifend nunc.'
// }];
