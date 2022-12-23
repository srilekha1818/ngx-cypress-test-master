import {navigateTo} from "../support/page_objects/navigationPage"
import { onFormLayoutsPage } from "../support/page_objects/formlayoutsPage"
import { onDatePickerPage } from "../support/page_objects/datepickerpage"
import { onSmartTablePage} from "../support/page_objects/smartTablepage"
describe('test with page objects',() => {
  beforeEach('open application',() => {
    cy.openHomePage()
  })
  it('verify navigations across the page',() => {
    navigateTo.formLayoutsPage()
    navigateTo.datepickerPage()
    navigateTo.smartTablePage()
    navigateTo.toasterPage()
    navigateTo.tooltipPage()
  })
  it('should submit inline and basic form and select tomorrow date in the calendar',() =>
  {
    navigateTo.formLayoutsPage()
    onFormLayoutsPage.submitInlineFormwithNameAndEmail('artem','test@test.com')
    onFormLayoutsPage.submitBasicFormwithEmailAndPPassword('test@test.com','password')
    navigateTo.datepickerPage()
    onDatePickerPage.selectCommonDatePickerDateFromToday(1)
    onDatePickerPage.selectDatePickerRangeFromToday(2,3)
    navigateTo.smartTablePage()
    onSmartTablePage.addNewRecordWithFirstAndLastName('Artem','Bondar')
    onSmartTablePage.updateAgeByFirstName('Artem','35')
    onSmartTablePage.deleteRowByIndex(1)


  })
})
