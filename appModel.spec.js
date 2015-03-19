describe('appModel section', function() {
  beforeEach(module('ProteusPlayground.appModel'));

  it('should have a single menu contributions', function() {
    module(function(appModelProvider) {
      appModelProvider.contributeMenu('menu', 'template');
    });

    inject(function(appModel) {
      expect(appModel.menu['menu']).toEqual('template');
    });
  });

  it('should throw an error if contribution point is already defined', function() {
    var provider;
    module(function(appModelProvider) {
      provider = appModelProvider;
    });

    inject(function(appModel) {
      provider.addContributionPoint('already.defined.extension.point', Object);
      expect(function() {
        provider.addContributionPoint('already.defined.extension.point', {
          any_object: ""
        });
      }).toThrow("the contribution point is already defined : already.defined.extension.point");
    });
  });

  it('should throw an error if contribution point is not defined', function() {
    var provider;
    module(function(appModelProvider) {
      provider = appModelProvider;
    });

    inject(function(appModel) {
      expect(function() {
        provider.contribute('invalid.id');
      }).toThrow("the contribution point does not exist : invalid.id");
    });
  });

  it('should throw an error if contribution is configured with wrong type', function() {
    var provider;
    var MenuContribution = (function() {
      function MenuContribution(attr_template, attr_position) {
        this.template = attr_template;
        this.position = attr_position;
      }
      return MenuContribution;

    })();
    module(function(appModelProvider) {
      provider = appModelProvider;
    });

    inject(function(appModel) {
      provider.addContributionPoint('core.menu', MenuContribution);
      expect(function() {
        provider.contribute('core.menu', {
          template: "something"
        });

      }).toThrow("the contribution class should be instance of : " + MenuContribution);
    });
  });

  it('should handle correctly contributions properly created', function() {
    var MenuContribution = (function() {
      function MenuContribution(attr_template, attr_position) {
        this.template = attr_template;
        this.position = attr_position;
      }

      return MenuContribution;

    })();
    module(function(appModelProvider) {
      appModelProvider.addContributionPoint('core.menu', MenuContribution);
      appModelProvider.contribute('core.menu', new MenuContribution("<a>link</a>", 2));
    });

    inject(function(appModel) {
      var menuContribution = appModel.contributions['core.menu'][0];
      expect(menuContribution.template).toEqual("<a>link</a>");
      expect(menuContribution.position).toEqual(2);
    });
  });
});
