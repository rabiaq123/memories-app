import requests
import json
from select_files_data import selected_files
import jwt

"""
Required pip libraries to install:
- json
- requests
- pyjwt
"""

BASE_URL = 'https://memories-server-cis4250.herokuapp.com/'
# BASE_URL = 'http://localhost:5500/'

class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

def root_endpoint_test( expected_results):
    """
    This test confirms the connection to the API
    """

    url = BASE_URL + ''
  

    submit_post_data = {
    }

    request = requests.get(url, headers={},)    
    
    recieved_results = request.text
    
    if recieved_results == expected_results:
        print (f'Testing that the root API call is returning a value; result is '+bcolors.OKGREEN + "TEST PASSED" + bcolors.ENDC)
    else:
        print (f'Testing that the root API call is returning a value; result is '+bcolors.FAIL + "TEST FAILED" + bcolors.ENDC)
        print ("****The expected results are******")
        print (expected_results)
        print ('****The recieve results are****')
        print (request.text)
    
    return

def find_post_by_id_test(id, title_text):
    """
    This test uses an id number to determine if the requested post is in the database.
    """

    url = BASE_URL + 'posts/' + id
    
    # print (f"The url being tested is: {url}")

    submit_post_data = {
    }

    request = requests.get(url, headers={},)    
    
    recieved_results = request.json()
    # print (recieved_results)
    # print (request.text)
    
    if recieved_results['title'] == title_text:
        print (f'Testing searching for a post id with the id of: {id}; result is '+bcolors.OKGREEN + "TEST PASSED" + bcolors.ENDC)
    else:
        print (f'Testing searching for a post id with the id of: {id}; result is '+bcolors.FAIL + "TEST FAILED" + bcolors.ENDC)
        print ("****The expected results are******")
        print (title_text)
        print ('****The recieve results are****')
        print (recieved_results)
    
    return

def user_endpoint_test(name):
    """
    This test confirms the connection to the API
    """

    url = BASE_URL + 'user/'+ name
  

    submit_post_data = {
    }

    request = requests.get(url, headers={},)    
    
    recieved_results = request.text
    
    # if recieved_results == expected_results:
    #     print (f'Testing that the root API call is returning a value; result is '+bcolors.OKGREEN + "TEST PASSED" + bcolors.ENDC)
    # else:
    #     print (f'Testing that the root API call is returning a value; result is '+bcolors.FAIL + "TEST FAILED" + bcolors.ENDC)
    #     print ("****The expected results are******")
    #     print (expected_results)
    print ('****The recieve results are****')
    recieved_results = request.json()
    print(json.dumps(recieved_results, sort_keys=False, indent=4))
    # print (request.text)
    
    return

#sprint 2 backend testcases
def edit_profile_test(id, email, name):
    """
    This test confirms the connection to the API
    """

    url = BASE_URL + 'user/editprofile'
  

    submit_post_data = {
        'id' : id,
        'email' : email,
        'name' : name
    }

    request = requests.post(url, json=submit_post_data, headers={},)    
    
    recieved_results = request.json()
    
    if recieved_results["updated_user"]["_id"] == id and recieved_results["updated_user"]["name"] == name and recieved_results["updated_user"]["email"] == email:
        print (f'Testing that the root API call is returning a value; result is '+bcolors.OKGREEN + "TEST PASSED" + bcolors.ENDC)
    else:
        print (f'Testing that the root API call is returning a value; result is '+bcolors.FAIL + "TEST FAILED" + bcolors.ENDC)
        print ("****The expected results are******")
        print ("id = " + id + ", email = " + email + ", name = " + name)
    
    return

def get_user_by_id_print(id):
    """
    This test confirms the connection to the API
    """

    url = BASE_URL + 'user/userbyid/'+id
  

    submit_post_data = {
    }

    request = requests.get(url, json=submit_post_data, headers={},)    
    
    recieved_results = request.json()
    
    # if recieved_results["found_user"]["_id"] == id and recieved_results["found_user"]["name"] == "Wes Update 4:01" and recieved_results["found_user"]["email"] == "test45@test.com":
    #     print (f'Testing that the root API call is returning a value; result is '+bcolors.OKGREEN + "TEST PASSED" + bcolors.ENDC)
    # else:
    # print (f'Testing that the root API call is returning a value; result is '+bcolors.FAIL + "TEST FAILED" + bcolors.ENDC)
    print ("****The expected results are******")
    print(json.dumps(recieved_results, sort_keys=False, indent=4))

    return


def get_user_by_id_test(id):
    """
    This test confirms the connection to the API
    """

    url = BASE_URL + 'user/userbyid/'+id
  

    submit_post_data = {
    }

    request = requests.get(url, json=submit_post_data, headers={},)    
    
    recieved_results = request.json()
    
    if recieved_results["found_user"]["_id"] == id and recieved_results["found_user"]["name"] == "Wes Update 4:01" and recieved_results["found_user"]["email"] == "test45@test.com":
        print (f'Testing that the root API call is returning a value; result is '+bcolors.OKGREEN + "TEST PASSED" + bcolors.ENDC)
    else:
        print (f'Testing that the root API call is returning a value; result is '+bcolors.FAIL + "TEST FAILED" + bcolors.ENDC)
        print ("****The expected results are******")
        print ("id = " + id + ", email = test45@test.com, name = Wes Update 4:01")
    
    return

def add_users_follower(id, new_follower):
    """
    This test confirms the connection to the API
    """

    url = BASE_URL + 'user/add-follower'
  

    submit_post_data = {
        "id" : id,
        "new_follower" : new_follower,
    }

    request = requests.post(url, json=submit_post_data, headers={},)    
    
    recieved_results = request.json()
    
    # if recieved_results["found_user"]["_id"] == id and recieved_results["found_user"]["name"] == "Wes Update 4:01" and recieved_results["found_user"]["email"] == "test45@test.com":
    #     print (f'Testing that the root API call is returning a value; result is '+bcolors.OKGREEN + "TEST PASSED" + bcolors.ENDC)
    # else:
    #     print (f'Testing that the root API call is returning a value; result is '+bcolors.FAIL + "TEST FAILED" + bcolors.ENDC)
    #     print ("****The expected results are******")
    #     print ("id = " + id + ", email = test45@test.com, name = Wes Update 4:01")
    
    print ("****The expected results are******")
    print(json.dumps(recieved_results, sort_keys=False, indent=4))

    return

def remove_follower(id, new_follower):
    """
    This test confirms the connection to the API
    """

    url = BASE_URL + 'user/remove-follower'
  

    submit_post_data = {
        "id" : id,
        "follower_to_remove" : new_follower,
    }

    request = requests.post(url, json=submit_post_data, headers={},)    
    
    recieved_results = request.json()
    
    # if recieved_results["found_user"]["_id"] == id and recieved_results["found_user"]["name"] == "Wes Update 4:01" and recieved_results["found_user"]["email"] == "test45@test.com":
    #     print (f'Testing that the root API call is returning a value; result is '+bcolors.OKGREEN + "TEST PASSED" + bcolors.ENDC)
    # else:
    #     print (f'Testing that the root API call is returning a value; result is '+bcolors.FAIL + "TEST FAILED" + bcolors.ENDC)
    #     print ("****The expected results are******")
    #     print ("id = " + id + ", email = test45@test.com, name = Wes Update 4:01")
    
    print ("****The expected results are******")
    print(json.dumps(recieved_results, sort_keys=False, indent=4))

    return

# Sprint 3 unit test
def add_users_follower_unit_test(id, new_follower):
    """
    This test confirms the connection to the API
    """

    url = BASE_URL + 'user/add-follower'
  

    submit_post_data = {
        "id" : id,
        "new_follower" : new_follower,
    }

    request = requests.post(url, json=submit_post_data, headers={},)    
    
    recieved_results = request.json()
    # print(json.dumps(recieved_results, sort_keys=False, indent=4))

    found_new_following = False

    try:
        following_list = recieved_results['followers']
        # print(json.dumps(following_list, sort_keys=False, indent=4))

        for current_follower in following_list:
            if current_follower["_id"] ==  new_follower:
                found_new_following = True

    except: 
        print (f'Testing the endpoint that adds a user to the followers list; result is '+bcolors.FAIL + "TEST FAILED" + bcolors.ENDC)
        print (f"The user {new_follower} was not found in the following list")
        return

    
    if found_new_following:
        print (f'Testing the endpoint that adds a user to the followers list; result is '+bcolors.OKGREEN + "TEST PASSED" + bcolors.ENDC)
    else:
        print (f'Testing the endpoint that adds a user to the followers list; result is '+bcolors.FAIL + "TEST FAILED" + bcolors.ENDC)
        print (f"The user {new_follower} was not found in the following list")
        
    
    # print ("****The expected results are******")
    # print(json.dumps(recieved_results, sort_keys=False, indent=4))

    return

def get_posts_following_test(id):
    """
    This test confirms the connection to the API
    """

    url = BASE_URL + f'posts/getfollowingposts?id={id}'
    print (url)

    submit_post_data = {
    }

    request = requests.get(url, json=submit_post_data, headers={},)    
    
    recieved_results = request.json()
    
    # if recieved_results["found_user"]["_id"] == id and recieved_results["found_user"]["name"] == "Wes Update 4:01" and recieved_results["found_user"]["email"] == "test45@test.com":
    #     print (f'Testing that the root API call is returning a value; result is '+bcolors.OKGREEN + "TEST PASSED" + bcolors.ENDC)
    # else:
    #     print (f'Testing that the root API call is returning a value; result is '+bcolors.FAIL + "TEST FAILED" + bcolors.ENDC)
    #     print ("****The expected results are******")
    #     print ("id = " + id + ", email = test45@test.com, name = Wes Update 4:01")
    
    print ("****The expected results are******")
    print(json.dumps(recieved_results, sort_keys=False, indent=4))

    return

def get_all_posts_test():
    """
    This test confirms the connection to the API
    """

    url = BASE_URL + f'posts/'
  

    submit_post_data = {
    }

    request = requests.get(url, json=submit_post_data, headers={},)    
    
    recieved_results = request.json()
    
    # if recieved_results["found_user"]["_id"] == id and recieved_results["found_user"]["name"] == "Wes Update 4:01" and recieved_results["found_user"]["email"] == "test45@test.com":
    #     print (f'Testing that the root API call is returning a value; result is '+bcolors.OKGREEN + "TEST PASSED" + bcolors.ENDC)
    # else:
    #     print (f'Testing that the root API call is returning a value; result is '+bcolors.FAIL + "TEST FAILED" + bcolors.ENDC)
    #     print ("****The expected results are******")
    #     print ("id = " + id + ", email = test45@test.com, name = Wes Update 4:01")
    
    print ("****The expected results are******")
    print(json.dumps(recieved_results, sort_keys=False, indent=4))

    return

def get_user_by_name_test(name):
    """
    This test confirms the connection to the API
    """

    url = BASE_URL + f'user/get-user-by-name/'+name
  

    submit_post_data = {
    }

    request = requests.get(url, json=submit_post_data, headers={},)    
    
    recieved_results = request.json()
    
    # if recieved_results["found_user"]["_id"] == id and recieved_results["found_user"]["name"] == "Wes Update 4:01" and recieved_results["found_user"]["email"] == "test45@test.com":
    #     print (f'Testing that the root API call is returning a value; result is '+bcolors.OKGREEN + "TEST PASSED" + bcolors.ENDC)
    # else:
    #     print (f'Testing that the root API call is returning a value; result is '+bcolors.FAIL + "TEST FAILED" + bcolors.ENDC)
    #     print ("****The expected results are******")
    #     print ("id = " + id + ", email = test45@test.com, name = Wes Update 4:01")
    
    print ("****The expected results are******")
    print(json.dumps(recieved_results, sort_keys=False, indent=4))

    return

# Sprint 3 unit test
def post_of_following__unit_test(id, following_id):
    """
    This test confirms the connection to the API
    """

    url = BASE_URL + f'posts/getfollowingposts?id={id}'
  

    submit_post_data = {
        "id" : id,
    }

    request = requests.get(url, json=submit_post_data, headers={},)    
    
    recieved_results = request.json()
    # print(json.dumps(recieved_results, sort_keys=False, indent=4))

    found_posts = recieved_results['data']
    # print(json.dumps(found_posts, sort_keys=False, indent=4))

    found_correct_post = False

    for current_post in found_posts:
        if current_post['creator'] == following_id:
            found_correct_post = True
    
    if found_correct_post:
        print (f'Testing the endpoint that returns all the posts of a users following list; result is '+bcolors.OKGREEN + "TEST PASSED" + bcolors.ENDC)
    else:
        print (f'Testing the endpoint that returns all the posts of a users following list; result is '+bcolors.FAIL + "TEST FAILED" + bcolors.ENDC)
        print (f"Posts from the user {following_id} were not found")


def delete_user_unit_test(id, email, user_name):
    """
    This test deletes a user and confirms the deletion happened correctly. In 
    order for this test to execute successfully the user must be created on
    the application.
    """

    # creating three posts on the user that was supplied
    create_post_test("Python Unit test Title 1", "Python Unit test Message 1", id, email, user_name, False)
    create_post_test("Python Unit test Title 2", "Python Unit test Message 2", id, email, user_name, False)
    create_post_test("Python Unit test Title 3", "Python Unit test Message 3", id, email, user_name, False)


    url = BASE_URL + f'user/delete-user/{id}'


    request = requests.delete(url, headers={},)    
    # print (request.text)
    recieved_results = request.json()
    # print(json.dumps(recieved_results, sort_keys=False, indent=4))

   
    
    if recieved_results['message'] == f"The user with id {id} was successfully deleted":
        print (f'Testing the endpoint that delets a user; result is '+bcolors.OKGREEN + "TEST PASSED" + bcolors.ENDC)
    else:
        print (f'Testing the endpoint that delets a user; result is '+bcolors.FAIL + "TEST FAILED" + bcolors.ENDC)
        print (f"Posts from the user {following_id} were not found")

def create_post_test(title, message, creator_id, creator_email, creator_name, print_boolean):
    """
    This test creates a post
    """

    url = BASE_URL + f'posts/'

    post_data = {
        
    }

    submit_post_data = {
        'title' : title,
        'message' : message,
        'tags' : [],
        'selectedFile' : selected_files[0],
        'comments' : [],
        'name' : creator_name
    }

    encoded_jwt = jwt.encode({"email": creator_email, "id": creator_id}, "test", algorithm="HS256")
    # print (f"The JWT token created is: {encoded_jwt}")
    request = requests.post(url, json=submit_post_data, headers={"Authorization" : f"Bearer {encoded_jwt}"},)    
    
    recieved_results = request.json()
    if print_boolean:
        print(json.dumps(recieved_results, sort_keys=False, indent=4))

    # found_posts = recieved_results['data']
    # # print(json.dumps(found_posts, sort_keys=False, indent=4))

    # found_correct_post = False

    # for current_post in found_posts:
    #     if current_post['creator'] == following_id:
    #         found_correct_post = True
    
    # if found_correct_post:
    #     print (f'Testing the endpoint that returns all the posts of a users following list; result is '+bcolors.OKGREEN + "TEST PASSED" + bcolors.ENDC)
    # else:
    #     print (f'Testing the endpoint that returns all the posts of a users following list; result is '+bcolors.FAIL + "TEST FAILED" + bcolors.ENDC)
    #     print (f"Posts from the user {following_id} were not found")

def test_incorrect_login_unittest(email, password):
    """
    This test creates a post
    """

    url = BASE_URL + f'user/signin'

    post_data = {
        
    }

    submit_post_data = {
        'email' : email,
        'password' : password,
    }

    # encoded_jwt = jwt.encode({"email": creator_email, "id": creator_id}, "test", algorithm="HS256")
    # print (f"The JWT token created is: {encoded_jwt}")
    request = requests.post(url, json=submit_post_data, headers={},)    
    
    recieved_results = request.json()
    # print (recieved_results)
    if request.status_code == 401:
        print (f'Testing the login endpoint with incorrect credentials; result is '+bcolors.OKGREEN + "TEST PASSED" + bcolors.ENDC)
    else:
        print (f'Testing the login endpoint with incorrect credentials; result is '+bcolors.FAIL + "TEST FAILED" + bcolors.ENDC)
        # print (f"Posts from the user {following_id} were not found")    



def main():

    print (f'The base URL that is being tested is: '+bcolors.OKBLUE + f'{BASE_URL}' + bcolors.ENDC)

    # *** Testing functions *****
    # get_user_by_id_print("6400c5e8dcc14a33a65f7876")
    # add_users_follower("6400c5e8dcc14a33a65f7876", "63e58ed226cfdd0014b607b8")
    # remove_follower("6400c5e8dcc14a33a65f7876", "63ff9f7c9f5ee10014557abe")
    # get_posts_following_test ("6400c5e8dcc14a33a65f7876")
    # get_all_posts_test()
    # get_user_by_name_test('Zayn Abbas')
    # create_post_test("python script test title", "python scrip test message", "6423182c777ee2001401ed1e", "test46@test.com", "Wes 3 Test")


    # **** Unit tests ******

    # root_endpoint_test("Hello to memories API from Wes ")
    # find_post_by_id_test('63e5917726cfdd0014b607bb', 'Rabia Testing Tags')
    # find_post_by_id_test('63e3fab8e637334c78f1cb1d', 'Yeehaw')
    # edit_profile_test("6400c5e8dcc14a33a65f7876", "test45@test.com", "Wes Update 4:01")
    # get_user_by_id_test("6400c5e8dcc14a33a65f7876")
    # add_users_follower_unit_test ("6400c5e8dcc14a33a65f7876", "63ff9f7c9f5ee10014557abe")
    # post_of_following__unit_test("6400c5e8dcc14a33a65f7876", "63ebe2df07578e0014da8d55")
    delete_user_unit_test ('642c373dc0ba7b00145a56d4', 'test46@test.com', 'Wes 3 Test')
    # test_incorrect_login_unittest('test66@gmail.com', '1234')
    


main()