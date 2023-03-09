import requests
import json

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
  

    submit_post_data = {
    }

    request = requests.get(url, headers={},)    
    
    recieved_results = request.json()
    
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
    # print ('****The recieve results are****')
    # recieved_results = request.json()
    # print(json.dumps(recieved_results, sort_keys=False, indent=4))
    # print (request.text)
    
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
    # print ('****The recieve results are****')
    # recieved_results = request.json()
    # print(json.dumps(recieved_results, sort_keys=False, indent=4))
    # print (request.text)
    
    return

def main():

    print (f'The base URL that is being tested is: '+bcolors.OKBLUE + f'{BASE_URL}' + bcolors.ENDC)

    # root_endpoint_test("Hello to memories API from Wes ")
    # find_post_by_id_test('63e526df26cfdd0014b607b7', 'Wes Test 1 ')
    # find_post_by_id_test('63e3fab8e637334c78f1cb1d', 'Yeehaw')
    # user_endpoint_test("Wes%20Test")
    edit_profile_test("6400c5e8dcc14a33a65f7876", "test45@test.com", "Wes Update 4:01")
    get_user_by_id_test("6400c5e8dcc14a33a65f7876")
main()