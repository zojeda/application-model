(function(module) {

  module.provider('appModel', function() {
    var appModel = {
      contributionPoints: {},
      contributions: {}
    };
    return {
      addContributionPoint: function(id, contributionMeta) {
        var ContribClass = appModel.contributionPoints[id];
        if(ContribClass) {
          throw new Error("the contribution point is already defined : " + id);
        }
        appModel.contributionPoints[id] = contributionMeta;
      },
      contribute: function(id, contribution) {
        var ContribClass = appModel.contributionPoints[id];
        if(!ContribClass) {
          throw new Error("the contribution point does not exist : " + id);
        }
        var contribs = appModel.contributions[id];
        if(!contribs) {
          appModel.contributions[id] = [];
          contribs = appModel.contributions[id];
        }
        if(contribution instanceof ContribClass) {
          contribs.push(contribution);
        } else {
          throw new Error("the contribution class should be instance of : " + ContribClass);
        }

      },

      $get : function() {
        return appModel;
      }
    };

  });


}(angular.module("appilcationModel")));
