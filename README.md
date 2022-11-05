# WW Distance Calculator

A simple distance calculator using PHP, JS and HTML.

The following implementation will be creating a PHP web service which takes in five parameters (two distances and a corresponding metric unit for each, and a separate metric for the final result). Using simple HTML, the interface will provide users with a form through which they can specify the distances and an associated 'Calculate' button below to generate the final added total of both distances. The web service will also need to take into consideration potential conversions across the different metric units.

---

Keeping the above objective in mind, the project will be split into the following phases:

1. Designing a quick simple form through Figma to understand more clearly the required components needed.
2. Setting up the project space and HTML index file (including calling Bootstrap through CDN).
3. Creating the required HTML components and implementing the main form structure.
4. Building the PHP file hosting the API that will be used to receive the distance parameters, validate the inputs given and generate the respective response and result.
5. Setting up the event listener for the form interface that:

-   Calls the API hosted in the PHP server file and fetches response
-   Updates users using the feedback panel
-   If successful, displays result back to the user.

Extra:
Following testing of the application (and provided there is additional time available) the form can also be styled through SCSS.
