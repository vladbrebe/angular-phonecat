'use strict';

// AngularJS E2E Testing Guide:
// https://docs.angularjs.org/guide/e2e-testing

describe('PhoneCat Application', function() {

  it('should redirect `index.html` to `index.html#!/phones`', function() {
    browser.get('index.html');
    expect(browser.getCurrentUrl()).toContain('index.html#!/phones');
  });

  describe('View: Phone list', function() {

    beforeEach(function() {
      browser.get('index.html#!/phones');
    });

    it('should filter the phone list as a user types into the search box', function() {
      var phoneList = element.all(by.repeater('phone in $ctrl.phones'));
      var query = element(by.model('$ctrl.query'));

      expect(phoneList.count()).toBe(5);

      query.sendKeys('motorola');
      expect(phoneList.count()).toBe(3);

      query.clear();
      query.sendKeys('streak');
      expect(phoneList.count()).toBe(1);
    });

    it('should be possible to control phone order via the drop-down menu', function() {
      var queryField = element(by.model('$ctrl.query'));
      var orderSelect = element(by.model('$ctrl.orderProp'));
      var nameOption = orderSelect.element(by.css('option[value="name"]'));
      var phoneNameColumn = element.all(by.repeater('phone in $ctrl.phones').column('phone.name'));

      function getNames() {
        return phoneNameColumn.map(function(elem) {
          return elem.getText();
        });
      }

      queryField.sendKeys('tablet');   // Let's narrow the dataset to make the assertions shorter

      expect(getNames()).toEqual([
        'Motorola XOOM™ with Wi-Fi',
        'MOTOROLA XOOM™'
      ]);

      nameOption.click();

      expect(getNames()).toEqual([
        'MOTOROLA XOOM™',
        'Motorola XOOM™ with Wi-Fi'
      ]);
    });

    it('should render phone specific links', function() {
      var query = element(by.model('$ctrl.query'));
      query.sendKeys('streak');

      element.all(by.css('.phones li a')).first().click();
      expect(browser.getCurrentUrl()).toContain('index.html#!/phones/dell-streak-7');
    });

  });

  describe('View: Phone detail', function() {

    beforeEach(function() {
      browser.get('index.html#!/phones/dell-streak-7');
    });

    it('should display the `dell-streak-7` page', function() {
      expect(element(by.binding('$ctrl.phone.name')).getText()).toBe('Dell Streak 7');
    });

  });

});
