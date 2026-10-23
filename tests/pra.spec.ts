import {expect, test} from '@playwright/test';

test('flipkart search', async({page})=>{

  await page.goto("https://flipkart.com");

  const searchText = page.getByRole('textbox' ,{name:'Search for Products, Brands and More'});

 const searchIcon= page.getByRole('button' ,{name:'Search for Products, Brands and More'});

const title=page.locator('.RG5Slk').first();

  await searchText.fill('iPhone 50');
await searchIcon.click();

const text= await title.innerText();

console.log(text);

})

test('test 2', async({page})=>{
  await page.goto("https://flipkart.com");
    const searchText = page.getByRole('textbox' ,{name:'Search for Products, Brands and More'});
  await searchText.fill('iPhone 50');
   const searchIcon= page.getByRole('button' ,{name:'Search for Products, Brands and More'});
await searchIcon.click();
 
  const text=page.getByText('Showing 1 – 24 of 2,057 results for');
  await expect(text).toBeVisible();

});

test('test 3', async({page})=>{
  await page.goto('https://www.way2automation.com/automationpracticesite1.html');
  await page.getByRole('button',{name:'Start Practicing Elements'}).click();

  // code for full name element

  //text box can be combined with accessible name or placeholder text

  // <div>
  //    <label class="block text-sm font-medium mb-2">Full Name (Textbox)</label>
  //    <input id="full-name" type="text" placeholder="Enter your name" class="w-full border border-gray-300 focus:border-indigo-500 rounded-2xl px-5 py-4 outline-none">
  //  </div>
  const name= page.getByRole('textbox',{name:'Enter your name'});

  //const name= page.getByRole('textbox',{name:'Full Name (Textbox)'}); this will work if label tag has attribute 'for' with id of 'input' tag
  // means--<label for="full-name"  class="block text-sm font-medium mb-2">Full Name (Textbox)</label>

  await name.fill("hello");
  //=========================================//

  
    const pwd = page.getByRole('textbox',{name:'••••••••'});
    await pwd.pressSequentially("passswpasx");

    const radio = page.getByRole('radio',{name:'Female'});
    await radio.check();
    await expect(radio).toBeChecked();

     const  traveling = page.getByRole('checkbox',{name:'Traveling'});
    await  traveling.check();
    await expect(traveling).toBeChecked();
    await expect(page.getByRole('checkbox',{name:'Reading'})).toBeChecked();




});

// Drag and drop - https://share.google/aimode/9lBYV4f4CGXRCiLYR

test('test 4', async({page})=>{
  await page.goto('https://www.way2automation.com/automationpracticesite1.html');
  await page.getByRole('button',{name:'Start Practicing Elements'}).click();
 const source = page.getByText('Mouse');
 const target = page.getByText('Drop items here');
 await source.dragTo(target);
});

test('test 5', async({page})=>{
  await page.goto('https://www.way2automation.com/automationpracticesite1.html');
  await page.getByRole('button',{name:'Start Practicing Elements'}).click();
//  const source = page.locator('#demo-slider');

//  await source.dragTo(source,{
//   targetPosition: { x: 900, y: 0 },
//   force: true
//  });
    const f= page.getByText('Product details and specifications go here. Great for testing tab navigation.');

    await expect(f).toBeVisible();

  await page.getByRole('button',{name:'Reviews'}).click();

  const t= page.getByText('Customer reviews appear here. Perfect for dynamic content testing.');
  await expect(t).toBeVisible();

});

test('test 6', async({page})=>{
  await page.goto('https://www.way2automation.com/automationpracticesite1.html');
  await page.getByRole('button',{name:'Start Practicing Elements'}).click();

let t = 'This is a standard JavaScript alert popup – perfect for Selenium alert handling practice!';
let expected='';

  //Register Listener First: Set up page.once('dialog', ...) or page.on('dialog', ...) before triggering the element click that opens the dialog.
  page.on('dialog', dialog =>{
    expected = dialog.message();
    dialog.accept();
  });

await page.getByRole('button',{name:'JS Alert'}).click();
expect(t).toBe(expected);
console.log(expected);

});

test('test 7 - assert Confirm dialog type and text', async ({ page }) => {
  await page.goto('https://www.way2automation.com/automationpracticesite1.html');
  await page.getByRole('button',{name:'Start Practicing Elements'}).click();
    let dialogCounter = 0;


  page.on('dialog', async (dialog) => {
    dialogCounter++;
        if (dialogCounter === 1) {
                // First dialog is the confirm box
    expect(dialog.type()).toBe('confirm'); 
    
    expect(dialog.message()).toBe('Are you sure? This tests confirm dialog handling.');
    
    await dialog.accept(); 
        }
        else if (dialogCounter === 2) {
      // Second dialog is the feedback alert box triggered by step 1
      expect(dialog.type()).toBe('alert');
    expect(dialog.message()).toBe('You clicked OK');
        await dialog.accept(); 
        }

  });

await page.getByRole('button',{name:'JS Confirm'}).click();
  expect(dialogCounter).toBe(2);

  //To handle sequential dialogs in Playwright, change page.once('dialog') to a persistent page.on('dialog') listener. This allows the listener to stay active, intercept both dialogs in order, and run assertions based on their dynamic index or type

//   [ Your Test Script ]                      [ Browser Engine ]

//          |                                        |
//  1. Clicks button ------------------------------> | (Executes application JS)

//          |                                        | Show confirm('Are you sure?')
//          |                                        |
//  2. Playwright intercepts dialog <----------------- Pauses page execution
//     • Increments dialogCounter to 1               |
//     • Asserts type is 'confirm'                   |
//     • Calls dialog.accept() --------------------> | Resumes app JS execution

//          |                                        | App sees "OK" clicked ->
//          |                                        | Immediately triggers:
//          |                                        | alert('You clicked OK')
//          |                                        |
//  3. Playwright intercepts 2nd dialog <------------ Pauses page execution again
//     • Increments dialogCounter to 2               |
//     • Asserts type is 'alert'                     |
//     • Calls dialog.accept() --------------------> | Resumes app JS execution

//          |                                        | Script finishes.
//  4. Test reaches expect(dialogCounter).toBe(2)    |


//• page.on vs page.once: page.once destroys itself immediately after handling the very first confirm box. The subsequent alert box would then fallback to Playwright's default auto-dismiss configuration before you could assert its text.
//• The Counter Strategy: Tracking dialogCounter allows you to target your assertions specifically to the exact sequence in which the browser fires the events.

});


test('test 8 - sequential dialogs using chained listeners', async ({ page }) => {
  await page.goto('https://www.way2automation.com/automationpracticesite1.html');
  await page.getByRole('button',{name:'Start Practicing Elements'}).click();

  // 1. Register the listener for the FIRST dialog (Confirm)
  page.once('dialog', async (confirmDialog) => {
    expect(confirmDialog.type()).toBe('confirm');
    expect(confirmDialog.message()).toBe('Are you sure? This tests confirm dialog handling.');

    // 2. WHILE inside the first listener, set up the trap for the SECOND dialog (Alert)
    page.once('dialog', async (alertDialog) => {
      expect(alertDialog.type()).toBe('alert');
      expect(alertDialog.message()).toBe('You clicked OK');
      await alertDialog.accept(); // Closes the alert box
    });

    // 3. Click OK on the confirm dialog, which instantly fires the alert dialog
    await confirmDialog.accept();
  });

  // 4. Trigger the initial confirm dialog action
await page.getByRole('button',{name:'JS Confirm'}).click();


// 1. What are async (dialog), async (confirmDialog), and async (alertDialog)?
// These are not built-in Playwright terms. They are simply variable names created for the arguments inside the standard JavaScript arrow function syntax: async (parameter) => { ... }.
// You can name this parameter absolutely anything you want, just like naming a variable in regular code.
});


test('test 9 - prompt dialogs using chained listeners', async ({ page }) => {
   await page.goto('https://www.way2automation.com/automationpracticesite1.html');
  await page.getByRole('button',{name:'Start Practicing Elements'}).click();

  // 1. Register the listener for the FIRST dialog (Confirm)
  page.once('dialog', async (confirmDialog) => {
    expect(confirmDialog.type()).toBe('prompt');
    expect(confirmDialog.message()).toBe('What is your name?');
        expect(confirmDialog.defaultValue()).toBe('Automation Tester');


    // 2. WHILE inside the first listener, set up the trap for the SECOND dialog (Alert)
    page.once('dialog', async (alertDialog) => {
      expect(alertDialog.type()).toBe('alert');
      expect(alertDialog.message()).toBe('Hello Automation Tester! Great for prompt handling tests.');
      await alertDialog.accept(); // Closes the alert box
    });

    // 3. Click OK on the confirm dialog, which instantly fires the alert dialog
    await confirmDialog.accept();
    
  });

  // 4. Trigger the initial confirm dialog action
await page.getByRole('button',{name:'JS Prompt'}).click();
});

test('test 10 - prompt dialogs using chained listeners with dynamic input from user', async ({ page }) => {
   await page.goto('https://www.way2automation.com/automationpracticesite1.html');
  await page.getByRole('button',{name:'Start Practicing Elements'}).click();

  // 1. Register the listener for the FIRST dialog (Confirm)
  page.once('dialog', async (confirmDialog) => {
    expect(confirmDialog.type()).toBe('prompt');
    expect(confirmDialog.message()).toBe('What is your name?');
        expect(confirmDialog.defaultValue()).toBe('Automation Tester');


    // 2. WHILE inside the first listener, set up the trap for the SECOND dialog (Alert)
    page.once('dialog', async (alertDialog) => {
      expect(alertDialog.type()).toBe('alert');
      expect(alertDialog.message()).toBe('Hello Sandhya! Great for prompt handling tests.');
      await alertDialog.accept(); // Closes the alert box
    });

    // 3. Click OK on the confirm dialog, which instantly fires the alert dialog
    await confirmDialog.accept('Sandhya');
    
  });

  // 4. Trigger the initial confirm dialog action
await page.getByRole('button',{name:'JS Prompt'}).click();
});

test('test 11', async({page})=>{
  await page.goto('https://www.way2automation.com/automationpracticesite1.html');
  await page.getByRole('button',{name:'Start Practicing Elements'}).click();
  await page.getByRole('button',{name:'Beautiful Modal'}).click();
    const t= page.getByRole('heading',{name:'Success!'});
    await expect(t).toBeVisible();

    const r= page.getByText('This modal was triggered by the button above.Perfect for Selenium popup handling.');
    await expect(r).toBeVisible();
    
  await page.getByRole('button',{name:'Close Modal'}).click();
 const b=  page.getByRole('button',{name:'Beautiful Modal'});

await expect(b).toBeVisible();
});

test('test 12', async({page})=>{
  await page.goto('https://www.way2automation.com/automationpracticesite2.html');
  
  await page.getByRole('button',{name:'OPEN MODAL'}).click();
  await page.keyboard.press('Escape');
  expect(page.getByRole('button',{name:'OPEN MODAL'})).toBeVisible();

  await page.getByLabel('Date of birth').fill('2026-05-15');
  await expect(page.getByLabel('Date of birth')).toHaveValue('2026-05-15');

  await page.getByLabel('Country').selectOption('IN');

  // Locate the hidden file input (even if it's display: none) and upload to it
await page.locator('input[type="file"]').setInputFiles('images/img.png');

// await page.locator('input[type="file"]').setInputFiles(['images/img.png' , 'images/copy.png' ]);

  });

test('test 13', async({page})=>{
  await page.goto('https://www.way2automation.com/practicesite/#frames');

const r= page.frameLocator('#single-iframe');
   expect(r.getByRole('button',{name:'Frame Button'})).toBeVisible();
       await expect(r.getByRole('button',{name:'Frame Button'})).toContainText('Frame Button'); 


   const tr = page.frame('left-frame');
expect(tr!.getByRole('heading',{name:'LEFT'})).toBeVisible();
    await expect(tr!.getByRole('heading',{name:'LEFT'})).toContainText('LEFT');
  });

//---------------------------------------------------------------------------------------------------
test('test 14', async({page})=>{

  await page.goto('https://qaplayground.com/practice/iframes');
const r2 = page
    .frameLocator('iframe[title="Outer Frame"]')
    .frameLocator('iframe[title="Inner Frame"]');
 await expect.soft(r.getByText('Locked')).toBeVisible();
await r2.getByLabel('Secret code').fill('secret');
       await r2.getByRole('button',{name:'Unlock'}).click(); 
        await expect.soft(r2.getByText('Unlocked with: secret ✓')).toBeVisible();

// Use getByPlaceholder instead of getByLabel
  await r2.getByPlaceholder('Secret code').fill('secret');

//other way to proceed page.frameLocator('[data-testid="iframe-outer"]').frameLocator('iframe[title="Inner Frame"]'). Then fill: .getByTestId('iframe-inner-input').fill('secret')
 


    });
