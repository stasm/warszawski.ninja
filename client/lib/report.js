createReport = function(name, line, dir, location) {
  // Does a similar report already exist?
  var existingReport = Reports.findOne({
    name: name,
    location: location,
    line: line,
    dir: dir
  });

  // If so and we can upvote, we do
  if (existingReport) {
    if (canVote(existingReport)) {
      Meteor.call("upvoteReport", existingReport._id);
    }
  } else {
    Meteor.call("saveReport", name, location, line, dir);
  }
  Materialize.toast(pickRandom(toasts.created), 2000);
};
