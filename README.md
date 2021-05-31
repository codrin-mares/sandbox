# sandbox
This is a sandbox repo for POC's.

# First run - "demo-code"

## Decription
Offers a simple but scalable validation method for object types that lets the user establish a set of rules which will be validated against the object. The output of these validation rules is a map of error location (key) and error outputs (value).

Apart from validation a generalized method was created in order to set the id field for an object, irrespective of the type or nature of provance of the value for the id. This was done with creating an abstract data type (ObjectId) and pattern matching it by handling the scenarios for the provenance of the id value (static, unknown, composed or in value). 

Tests for different scenarios were created in order to validate the functionalities and the particular cases.

Next points to improve:
- add pattern matching for all the different objects that might need to be validated (thus making the validate methods more abstract)
- add stricter validations for the input values, such as field type validation and type matching (io-ts library has different tools to facilitate this)
- make the code generic such as the functions will work agnostic of the type

Applications for the code:
- processing multiple streams of data with different structures and types
- first steps for a solution for typesafe nested object property getter