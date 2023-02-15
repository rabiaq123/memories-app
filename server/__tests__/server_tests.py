import requests
import json

BASE_URL = 'https://memories-server-cis4250.herokuapp.com/'

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

def main():

    root_endpoint_test("Hello to memories API from Wes ")
    find_post_by_id_test('63e526df26cfdd0014b607b7', 'Wes Test 1 ')
    find_post_by_id_test('63e3fab8e637334c78f1cb1d', 'Yeehaw')

main()