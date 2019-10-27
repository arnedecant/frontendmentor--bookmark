# Form Component: Form Validation

## Info

All fields in the form with the `[required]`-attribute will be validated against
an empty field. If the field has `[type="email"]`, it will also be validated
against an e-mail regex. If the field has `[data-validation-type="vat"]`, it
will also be validated against a VAT regex. The `<form>`-element needs to have 
the `[novalidate]`-attribute, otherwise default browser validation will be used.

Validation messages can be included on the `<form>`-element for **general error
messages** by using either `[data-validation-required]` for a required error message
when the field is empty or `[data-validation-invalid]` for an invalid error message 
when the validation fails.

Field specific error messages can be included on the `<input>` elements the same
way as with the general error messages.

To see all regular expressions in detail, see at the bottom of nano-form.js.


## Usage

```html
<form novalidate data-validation-required="Dit is een verplicht veld" data-validation-invalid="Dit veld is niet geldig">
    ...
    
    <!-- Example: input specific validation message -->
    <input type="text" required data-validation-type="vat" data-validation-invalid="Het BTW nummer is niet geldig" />
    
    <!-- Example: toggle -->
    <input type="checkbox" id="some-toggle" data-toggle="some-section" checked />
    <label for="some-toggle">Some label</label>
	
    <fieldset data-section="some-section">
        ...
    </fieldset>
</form>
```

```javascript
const form = new Form(selector, options)
```

## Parameters

| Parameter    	| Type          	| Description                                                                          	    |
|--------------	|---------------	|--------------------------------------------------------------------------------------	    |
| selector     	| String<br>Element | A CSS selector for your form<br> Your form element                                        |
| options      	| Object        	|                                                                                      	    |
| - buttons    	| Array[String] 	| A CSS selector for your button, **only** if this button is located outside of the form 	|
| - redirectTo 	| String        	| An URL where to redirect on success                                                  	    |
| - onSubmit   	| Function      	| Function which is always evoked on submit                                            	    |
| - onSuccess  	| Function      	| Function evoked on submit with success                                               	    |
| - onError    	| Function      	| Function evoked on submit with error                                                 	    |


## Properties

| Property    	| Type     	| Description              	|
|-------------	|----------	|--------------------------	|
| selector    	| String   	| Your form selector       	|
| options     	| Object   	| Your options             	|
| form        	| Element  	| The form element         	|
| buttons     	| NodeList 	| The button elements      	|
| fields      	| NodeList 	| All fields               	|
| initialData 	| Object   	| All initial field values 	|


## Methods

| Method           	| Property 	| Type    	| Description                                                                                                	|
|------------------	|----------	|---------	|------------------------------------------------------------------------------------------------------------	|
| reset(hard)      	|          	|         	| Resets the field values                                                                                    	|
|                  	| hard     	| Boolean 	| If set to true, will set all fields to empty. If set to false, will set all fields to their initial values. 	|
| submit()         	|          	|         	| Invokes a manual submit of the form                                                                        	|
| validateFields() 	|          	|         	| Invokes a manual validation of the form fields                                                             	|
| getData()        	|          	|         	| Get all current field values and returns an Object with field name:value pairs                             	|


## Todo

* Bugs:
	* Toggles don't work after an AJAX request
* Will add:
	* Validation for telephone numbers
	* Validation for dates
* Might add:
	* Input masks


## Contact

* @arnedecant - hello@arnedecant.be