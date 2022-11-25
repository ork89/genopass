# GenOpass - Generator of Passwords:

### In the add new password modal window, after pressing the generate password button:
    a new modal window should open with the following options (with a checkbox and a number field for each option):

1.  **length of password**
2.  **use numbers?** (if '_yes_' how many?)
3.  **use lower case letters?** (if '_yes_' how many?)
4.  **use upper case letters?** (if '_yes_' how many?)
5.  **use special characters?** (if '_yes_' how many?)

-   the parameters from that modal window should pass down to the PasswordGenerator
    component as props and then should affect the '_ruls_' array.

-   There will be a copy password button.
-   After closing the modal window, the password should populate the password field in the
    create new password modal window.
