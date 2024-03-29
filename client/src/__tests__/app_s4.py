import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.action_chains import ActionChains
from selenium.common.exceptions import TimeoutException, NoSuchElementException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

class PythonOrgSearch(unittest.TestCase):
    # IDs were retrieved from inspect tool on site

    invalid_email = "rabiatest2@test.com"
    invalid_password = "rabiatest2"
    valid_email = "rabiatest@test.com"
    valid_password = "rabiatest"

    ### US9 (account deletion) test cases:
    # select delete account but cancel upon confirmation
    # delete account
    ### US10 (sign in errors) test cases:
    # incorrect email and password
    # incorrect email and correct password
    # correct email and incorrect password
    # correct email and correct password before invalid attempts
    # correct email and correct password after invalid attempts
    ### US11 (unique username) test cases:
    # Test Case 1: Locate username input
    # Test Case 2: signup with a non-existent username
    # Test Case 3: Display username on profile
    # Test Case 4: Edit username


    def setUp(self):
        self.driver = webdriver.Chrome()

    # US9: select delete account but cancel upon confirmation
    def test_cancel_deletion_upon_confirmation(self):
        driver = self.driver
        driver.maximize_window()
        
        # sign in
        driver.get("http://localhost:3000/auth")
        try:
            signin_title_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/main/div/h1')) # Sign in form title
            WebDriverWait(driver, 5).until(signin_title_present)
        except TimeoutException:
            print 
            "Timed out waiting for page to load"
        email = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/div[1]/div/div/input')
        password = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/div[2]/div/div/input')
        email.send_keys(self.valid_email)
        password.send_keys(self.valid_password)
        driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/button[1]').click()
        try:
            logout_present = EC.text_to_be_present_in_element((By.XPATH, '//*[@id="root"]/div/header/div/div/button'), "Logout") # Logout button
            WebDriverWait(driver, 5).until(logout_present)
        except TimeoutException:
            print 
            "Timed out waiting for page to load"
        
        # navigate to Edit Profile page
        time.sleep(1) # wait for posts/state to load
        driver.find_element(By.XPATH, '//*[@id="root"]/div/header/div/div/a').click() # user avatar
        try:
            edit_button_present = EC.text_to_be_present_in_element((By.XPATH, '//*[@id="root"]/div/div/div[1]/div/a/span[1]'), "Edit Profile") # Edit Profile button
            WebDriverWait(driver, 5).until(edit_button_present)
        except TimeoutException:
            print 
            "Timed out waiting for page to load"
        
        # select delete account but cancel upon confirmation
        driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div[1]/div/a/span[1]').click() # Edit Profile button
        try:
            # click on Delete Account button before confirmation modal appears
            delete_button_present = EC.text_to_be_present_in_element((By.XPATH, '//*[@id="root"]/div/main/div/form/button[3]/span[1]'), "Delete") # Delete Account button
            WebDriverWait(driver, 5).until(delete_button_present)
            driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/button[3]/span[1]').click() 
            # click on Cancel button in confirmation modal
            cancel_delete_button_present = EC.presence_of_element_located((By.XPATH, '//*[@id="modal-modal-description"]/div/button[1]/span[1]')) # confirmation modal's Cancel button
            WebDriverWait(driver, 5).until(cancel_delete_button_present)
            driver.find_element(By.XPATH, '//*[@id="modal-modal-description"]/div/button[1]/span[1]').click()
            # assert Delete confirmation modal is not present
            self.assertNotIn("Are you sure you want to delete your account? You will be logged out upon confirmation.", driver.page_source)
        except TimeoutException:
            print 
            "Timed out waiting for page to load"
        
    #US9: delete account
    def test_delete_account(self):
        driver = self.driver
        driver.maximize_window()

        # sign in
        driver.get("http://localhost:3000/auth")
        try:
            signin_title_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/main/div/h1')) # Sign in form title
            WebDriverWait(driver, 5).until(signin_title_present)
        except TimeoutException:
            print 
            "Timed out waiting for page to load"
        email = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/div[1]/div/div/input')
        password = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/div[2]/div/div/input')
        email.send_keys(self.valid_email)
        password.send_keys(self.valid_password)
        driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/button[1]').click()
        try:
            logout_present = EC.text_to_be_present_in_element((By.XPATH, '//*[@id="root"]/div/header/div/div/button'), "Logout") # Logout button
            WebDriverWait(driver, 5).until(logout_present)
        except TimeoutException:
            print 
            "Timed out waiting for page to load"
        
        # navigate to Edit Profile page
        time.sleep(1) # wait for posts/state to load
        driver.find_element(By.XPATH, '//*[@id="root"]/div/header/div/div/a').click() # user avatar
        try:
            edit_button_present = EC.text_to_be_present_in_element((By.XPATH, '//*[@id="root"]/div/div/div[1]/div/a/span[1]'), "Edit Profile") # Edit Profile button
            WebDriverWait(driver, 5).until(edit_button_present)
        except TimeoutException:
            print 
            "Timed out waiting for page to load"
        
        # select delete account but cancel upon confirmation
        driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div[1]/div/a/span[1]').click() # Edit Profile button
        try:
            # click on Delete Account button before confirmation modal appears
            delete_button_present = EC.text_to_be_present_in_element((By.XPATH, '//*[@id="root"]/div/main/div/form/button[3]/span[1]'), "Delete") # Delete Account button
            WebDriverWait(driver, 5).until(delete_button_present)
            driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/button[3]/span[1]').click() 
            # click on Delete button in confirmation modal
            modal_delete_button_present = EC.presence_of_element_located((By.XPATH, '//*[@id="modal-modal-description"]/div/button[2]/span[1]')) # confirmation modal's Delete button
            WebDriverWait(driver, 5).until(modal_delete_button_present)
            driver.find_element(By.XPATH, '//*[@id="modal-modal-description"]/div/button[2]/span[1]').click()
            # wait for delete confirmation message to appear
            confirmation_msg_present = EC.text_to_be_present_in_element((By.XPATH, '//*[@id="root"]/div/div/div[1]/div/a/span[1]'), "Deleting...")
            WebDriverWait(driver, 5).until(confirmation_msg_present)
            signin_title_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/main/div/h1')) # Sign in form title
            WebDriverWait(driver, 5).until(signin_title_present)
        except TimeoutException:
            print 
            "Timed out waiting for page to load"

    # US10: correct email and correct password
    def test_signin_valid_credentials(self):
        driver = self.driver
        driver.maximize_window()
        driver.get("http://localhost:3000/auth")
        try:
            element_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/main/div/h1')) # Sign in form title
            WebDriverWait(driver, 5).until(element_present)
        except TimeoutException:
            print 
            "Timed out waiting for page to load"
        email = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/div[1]/div/div/input')
        password = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/div[2]/div/div/input')
        email.send_keys(self.valid_email)
        password.send_keys(self.valid_password)
        driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/button[1]').click()
        try:
            element_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/header/div/div/button')) # Logout button
            WebDriverWait(driver, 5).until(element_present)
            self.assertIn("Logout", driver.page_source)
        except TimeoutException:
            print 
            "Timed out waiting for page to load"

    # US10: incorrect email and incorrect password
    def test_signin_invalid_credentials(self):
        driver = self.driver
        driver.maximize_window()
        driver.get("http://localhost:3000/auth")
        try:
            element_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/main/div/h1')) # Sign in form title
            WebDriverWait(driver, 5).until(element_present)
        except TimeoutException:
            print 
            "Timed out waiting for page to load"
        email = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/div[1]/div/div/input')
        password = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/div[2]/div/div/input')
        email.send_keys(self.invalid_email)
        password.send_keys(self.invalid_password)
        driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/button[1]').click()
        try:
            element_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/span')) # error message
            WebDriverWait(driver, 5).until(element_present)
            self.assertIn("Invalid email or password.", driver.page_source)
        except TimeoutException:
            print 
            "Timed out waiting for page to load"

    # US10: incorrect email and correct password
    def test_signin_invalid_email(self):
        driver = self.driver
        driver.maximize_window()
        driver.get("http://localhost:3000/auth")
        try:
            element_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/main/div/h1')) # Sign in form title
            WebDriverWait(driver, 5).until(element_present)
        except TimeoutException:
            print 
            "Timed out waiting for page to load"
        email = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/div[1]/div/div/input')
        password = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/div[2]/div/div/input')
        email.send_keys(self.invalid_email)
        password.send_keys(self.valid_password)
        driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/button[1]').click()
        try:
            element_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/span')) # error message
            WebDriverWait(driver, 5).until(element_present)
            self.assertIn("Invalid email or password.", driver.page_source)
        except TimeoutException:
            print 
            "Timed out waiting for page to load"

    # US10: correct email and incorrect password
    def test_signin_invalid_password(self):
        driver = self.driver
        driver.maximize_window()
        driver.get("http://localhost:3000/auth")
        try:
            element_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/main/div/h1')) # Sign in form title
            WebDriverWait(driver, 5).until(element_present)
        except TimeoutException:
            print 
            "Timed out waiting for page to load"
        email = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/div[1]/div/div/input')
        password = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/div[2]/div/div/input')
        email.send_keys(self.valid_email)
        password.send_keys(self.invalid_password)
        driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/button[1]').click()
        try:
            element_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/span')) # error message
            WebDriverWait(driver, 5).until(element_present)
            self.assertIn("Invalid email or password.", driver.page_source)
        except TimeoutException:
            print 
            "Timed out waiting for page to load"

    # US10: correct email and correct password after a previous invalid attempt
    def test_signin_after_invalid_attempts(self):
        driver = self.driver
        driver.maximize_window()
        driver.get("http://localhost:3000/auth")
        try:
            element_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/main/div/h1')) # Sign in form title
            WebDriverWait(driver, 5).until(element_present)
        except TimeoutException:
            print 
            "Timed out waiting for page to load"
        email = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/div[1]/div/div/input')
        password = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/div[2]/div/div/input')
        
        # attempt to sign in with invalid credentials
        email.send_keys(self.invalid_email)
        password.send_keys(self.valid_password)
        driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/button[1]').click()
        try:
            error_present = EC.text_to_be_present_in_element((By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/span'), "Invalid email or password.") # error message
            WebDriverWait(driver, 5).until(error_present)
        except TimeoutException:
            print 
            "Timed out waiting for page to load"
        
        # attempt to sign in with valid credentials
        email = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/div[1]/div/div/input')
        password = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/div[2]/div/div/input')
        email.send_keys(self.valid_email)
        password.send_keys(self.valid_password)
        driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/button/span[1]').click()
        try:
            element_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/header/div/div/button')) # Logout button
            WebDriverWait(driver, 5).until(element_present)
            self.assertIn("Logout", driver.page_source)
        except TimeoutException:
            print 
            "Timed out waiting for page to load"

        
    # US11 Test Case 1: Locate username input
    def test_username_display(self):
        driver = self.driver
        driver.maximize_window()
        driver.get("https://rad-naiad-d04419.netlify.app/posts")
        # locate Sign Up button
        signin_button = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div[2]/div/button/span[1]')
        signin_button.click()

        # Find username element
        try:
            element_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/div[1]/div/div/input')) # username input
            WebDriverWait(driver, 5).until(element_present)
        except TimeoutException:
            print 
            "Timed out waiting for page to load"


    # US11 Test Case 2: signup with a non-existent username
    def test_username_signup(self):
        driver = self.driver
        driver.maximize_window()
        driver.get("https://rad-naiad-d04419.netlify.app/posts")
        # locate Sign Up button
        signin_button = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div[2]/div/button/span[1]')
        signin_button.click()

        # Find username element
        try:
            element_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/div[1]/div/div/input')) # username input
            WebDriverWait(driver, 5).until(element_present)
        except TimeoutException:
            print 
            "Timed out waiting for page to load"

        # Enter credentials
        username = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/div[1]/div/div/input')
        firstname = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/div[2]/div/div/input')
        lastname = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/div[3]/div/div/input')
        email = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/div[4]/div/div/input')
        password = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/div[5]/div/div/input')
        # repeatPassword = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/div[6]/div/div/input')

        username.send_keys("userstory11test")
        firstname.send_keys("user11")
        lastname.send_keys("story11")
        email.send_keys("us11@test")
        password.send_keys("us")
        # repeatPassword.send_keys("us")

        # Attempt to signup
        driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/button').click()
        try:
            element_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/div/div/div[1]/h5')) # New landing page
            WebDriverWait(driver, 5).until(element_present)
        except TimeoutException:
            print 
            "Timed out waiting for page to load"

    # US11 Test Case 3: Display username on profile
    def test_username_profile(self):
        driver = self.driver
        driver.maximize_window()
        driver.get("https://rad-naiad-d04419.netlify.app/auth")
        # locate and enter email and password and submit
        email = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/div[1]/div/div/input')
        password = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/div[2]/div/div/input')
        email.send_keys("triple@h")
        password.send_keys("tt")
        driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/button[1]').click()

        try:
            element_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/header/div/div/a')) # post title
            WebDriverWait(driver, 5).until(element_present)

        except TimeoutException:
            print 
            "Timed out waiting for page to load"
        # Navigate to profile page
        driver.find_element(By.XPATH, '//*[@id="root"]/div/header/div/div/a').click()
        
        try:
            element_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/div/div[1]/div[2]/p[1]')) # New landing page
            WebDriverWait(driver, 5).until(element_present)
        except TimeoutException:
            print 
            "Timed out waiting for page to load"

    # US11 Test Case 4: Edit username
    def test_username_edit(self):
        driver = self.driver
        driver.maximize_window()
        driver.get("https://rad-naiad-d04419.netlify.app/auth")
        # locate and enter email and password and submit
        email = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/div[1]/div/div/input')
        password = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div[1]/div[2]/div/div/input')
        email.send_keys("triple@h")
        password.send_keys("tt")
        driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/button[1]').click()

        try:
            element_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/header/div/div/a')) # profile navigation
            WebDriverWait(driver, 5).until(element_present)

        except TimeoutException:
            print 
            "Timed out waiting for page to load"
        # Navigate to profile page
        driver.find_element(By.XPATH, '//*[@id="root"]/div/header/div/div/a').click()
        
        try:
            element_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/div/div[1]/div[3]/a')) # username input
            WebDriverWait(driver, 5).until(element_present)
        except TimeoutException:
            print 
            "Timed out waiting for page to load"

        # Edit username
        driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div[1]/div[3]/a').click()

        try:
            element_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/main/div/form/div/div[1]/div/div/input')) # username input
            WebDriverWait(driver, 5).until(element_present)
        except TimeoutException:
            print 
            "Timed out waiting for page to load"

        username = driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/div/div[1]/div/div/input')
        username.send_keys("doubleh")
        driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/button[1]').click()
        driver.find_element(By.XPATH, '//*[@id="root"]/div/main/div/form/button[2]').click()

        # Check if updated
        try:
            element_present = EC.presence_of_element_located((By.XPATH, '//*[@id="root"]/div/div/div[1]/div[2]/p[1]')) # username 
            WebDriverWait(driver, 5).until(element_present)
            self.assertIn("doubleh", driver.page_source)
        except TimeoutException:
            print 
            "Timed out waiting for page to load"






    def tearDown(self):
        self.driver.close()


if __name__ == "__main__":
    unittest.main()
