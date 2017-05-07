import { browser, by, element, Key } from 'protractor';

describe('Example Tests', function () {

    let inputName = 'test';
    let inputPw = 'test';

    beforeEach(() => {

    });

    it('should show title', function () {
        browser.get('');
        expect(browser.getTitle()).toEqual('ExApp');
    });

    it('should log in', () => {
        browser.get('');
        let username = element(by.name('username'));
        let pw = element(by.name('password'));
        username.sendKeys(inputName);
        pw.sendKeys(inputPw);
        element(by.css('button[type="submit"]')).click();

        let sideNav = element(by.css('md-sidenav-container'));
        expect(sideNav.isPresent()).toBe(true);
    });

});
