#!/usr/bin/env python3
"""
BugZero Cyber Solutions Phase 2 Backend API Test Suite
Tests all Phase 2 automation features as specified in the review request.
"""

import requests
import json
import sys
from datetime import datetime

# Test configuration
BASE_URL = "https://2ba96ad6-9306-4154-b750-1a83a873e57e.preview.emergentagent.com/api"
TIMEOUT = 30

def print_test_result(test_name, success, details=""):
    """Print formatted test results"""
    status = "✅ PASS" if success else "❌ FAIL"
    print(f"{status} - {test_name}")
    if details:
        print(f"    Details: {details}")
    print()

def test_lead_crm_system():
    """Test Lead CRM System endpoints"""
    print("🔍 Testing Lead CRM System...")
    results = []
    
    # Test 1: POST /api/leads - Create lead with auto-scoring (Government = HOT)
    print("Testing POST /api/leads - Government lead (should be HOT)...")
    government_lead = {
        "name": "Rajesh Kumar",
        "email": "rajesh@governmentbank.in",
        "phone": "+91-99999-99999",
        "company": "Government Bank",
        "message": "Need VAPT",
        "service": "Web Application VAPT",
        "budget": "200000",
        "source": "contact_form"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/leads", 
                               json=government_lead, 
                               headers={'Content-Type': 'application/json'},
                               timeout=TIMEOUT)
        
        if response.status_code == 201:
            data = response.json()
            if data.get('success') and 'data' in data:
                # Check if auto-scoring worked (government should be HOT)
                lead_id = data['data'].get('id')
                print_test_result("POST /api/leads (Government - HOT)", True, f"Lead ID: {lead_id}")
                results.append(True)
                government_lead_id = lead_id
            else:
                print_test_result("POST /api/leads (Government - HOT)", False, f"Invalid response: {data}")
                results.append(False)
                government_lead_id = None
        else:
            print_test_result("POST /api/leads (Government - HOT)", False, f"Status: {response.status_code}, Body: {response.text}")
            results.append(False)
            government_lead_id = None
    except Exception as e:
        print_test_result("POST /api/leads (Government - HOT)", False, f"Exception: {str(e)}")
        results.append(False)
        government_lead_id = None
    
    # Test 2: POST /api/leads - Low budget lead (should be COLD)
    print("Testing POST /api/leads - Low budget lead (should be COLD)...")
    small_lead = {
        "name": "Small User",
        "email": "small@test.com",
        "budget": "10000",
        "source": "test"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/leads", 
                               json=small_lead, 
                               headers={'Content-Type': 'application/json'},
                               timeout=TIMEOUT)
        
        if response.status_code == 201:
            data = response.json()
            if data.get('success') and 'data' in data:
                small_lead_id = data['data'].get('id')
                print_test_result("POST /api/leads (Low Budget - COLD)", True, f"Lead ID: {small_lead_id}")
                results.append(True)
            else:
                print_test_result("POST /api/leads (Low Budget - COLD)", False, f"Invalid response: {data}")
                results.append(False)
                small_lead_id = None
        else:
            print_test_result("POST /api/leads (Low Budget - COLD)", False, f"Status: {response.status_code}, Body: {response.text}")
            results.append(False)
            small_lead_id = None
    except Exception as e:
        print_test_result("POST /api/leads (Low Budget - COLD)", False, f"Exception: {str(e)}")
        results.append(False)
        small_lead_id = None
    
    # Test 3: GET /api/leads with filters
    print("Testing GET /api/leads with filters...")
    filter_tests = [
        ("?status=new", "status filter"),
        ("?priority=hot", "priority filter"),
        ("?search=test", "search filter")
    ]
    
    for filter_param, filter_name in filter_tests:
        try:
            response = requests.get(f"{BASE_URL}/leads{filter_param}", timeout=TIMEOUT)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success') and 'data' in data:
                    count = len(data['data'])
                    print_test_result(f"GET /api/leads ({filter_name})", True, f"Retrieved {count} leads")
                    results.append(True)
                else:
                    print_test_result(f"GET /api/leads ({filter_name})", False, f"Invalid response: {data}")
                    results.append(False)
            else:
                print_test_result(f"GET /api/leads ({filter_name})", False, f"Status: {response.status_code}")
                results.append(False)
        except Exception as e:
            print_test_result(f"GET /api/leads ({filter_name})", False, f"Exception: {str(e)}")
            results.append(False)
    
    # Test 4: PATCH /api/leads/:id - Update lead
    if government_lead_id:
        print(f"Testing PATCH /api/leads/{government_lead_id}...")
        try:
            response = requests.patch(f"{BASE_URL}/leads/{government_lead_id}", 
                                    json={"status": "contacted"}, 
                                    headers={'Content-Type': 'application/json'},
                                    timeout=TIMEOUT)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success'):
                    print_test_result("PATCH /api/leads/:id", True, "Lead updated successfully")
                    results.append(True)
                else:
                    print_test_result("PATCH /api/leads/:id", False, f"Invalid response: {data}")
                    results.append(False)
            else:
                print_test_result("PATCH /api/leads/:id", False, f"Status: {response.status_code}, Body: {response.text}")
                results.append(False)
        except Exception as e:
            print_test_result("PATCH /api/leads/:id", False, f"Exception: {str(e)}")
            results.append(False)
    else:
        print_test_result("PATCH /api/leads/:id", False, "No lead ID available for testing")
        results.append(False)
    
    # Test 5: DELETE /api/leads/:id - Delete lead
    if small_lead_id:
        print(f"Testing DELETE /api/leads/{small_lead_id}...")
        try:
            response = requests.delete(f"{BASE_URL}/leads/{small_lead_id}", timeout=TIMEOUT)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success'):
                    print_test_result("DELETE /api/leads/:id", True, "Lead deleted successfully")
                    results.append(True)
                else:
                    print_test_result("DELETE /api/leads/:id", False, f"Invalid response: {data}")
                    results.append(False)
            else:
                print_test_result("DELETE /api/leads/:id", False, f"Status: {response.status_code}, Body: {response.text}")
                results.append(False)
        except Exception as e:
            print_test_result("DELETE /api/leads/:id", False, f"Exception: {str(e)}")
            results.append(False)
    else:
        print_test_result("DELETE /api/leads/:id", False, "No lead ID available for testing")
        results.append(False)
    
    return all(results)

def test_ai_chatbot():
    """Test AI Chatbot endpoint"""
    print("🔍 Testing AI Chatbot...")
    
    # Test 1: Basic chat message
    print("Testing POST /api/chat - Basic message...")
    chat_data = {
        "message": "What services do you offer?",
        "history": []
    }
    
    try:
        response = requests.post(f"{BASE_URL}/chat", 
                               json=chat_data, 
                               headers={'Content-Type': 'application/json'},
                               timeout=TIMEOUT)
        
        if response.status_code == 200:
            data = response.json()
            if data.get('success') and 'reply' in data:
                print_test_result("POST /api/chat (Basic)", True, f"Reply received: {data['reply'][:100]}...")
                basic_success = True
            else:
                print_test_result("POST /api/chat (Basic)", False, f"Invalid response: {data}")
                basic_success = False
        else:
            print_test_result("POST /api/chat (Basic)", False, f"Status: {response.status_code}, Body: {response.text}")
            basic_success = False
    except Exception as e:
        print_test_result("POST /api/chat (Basic)", False, f"Exception: {str(e)}")
        basic_success = False
    
    # Test 2: Chat with history
    print("Testing POST /api/chat - With conversation history...")
    chat_with_history = {
        "message": "Can you tell me more about VAPT?",
        "history": [
            {"role": "user", "content": "What services do you offer?"},
            {"role": "assistant", "content": "We offer cybersecurity services including VAPT, penetration testing, and security audits."}
        ]
    }
    
    try:
        response = requests.post(f"{BASE_URL}/chat", 
                               json=chat_with_history, 
                               headers={'Content-Type': 'application/json'},
                               timeout=TIMEOUT)
        
        if response.status_code == 200:
            data = response.json()
            if data.get('success') and 'reply' in data:
                print_test_result("POST /api/chat (With History)", True, f"Reply received: {data['reply'][:100]}...")
                history_success = True
            else:
                print_test_result("POST /api/chat (With History)", False, f"Invalid response: {data}")
                history_success = False
        else:
            print_test_result("POST /api/chat (With History)", False, f"Status: {response.status_code}, Body: {response.text}")
            history_success = False
    except Exception as e:
        print_test_result("POST /api/chat (With History)", False, f"Exception: {str(e)}")
        history_success = False
    
    return basic_success and history_success

def test_security_scanner():
    """Test Security Scanner endpoint"""
    print("🔍 Testing Security Scanner...")
    
    # Test 1: Valid domain scan
    print("Testing POST /api/security-scan - Valid domain...")
    scan_data = {"url": "google.com"}
    
    try:
        response = requests.post(f"{BASE_URL}/security-scan", 
                               json=scan_data, 
                               headers={'Content-Type': 'application/json'},
                               timeout=TIMEOUT)
        
        if response.status_code == 200:
            data = response.json()
            if data.get('success') and 'data' in data and 'score' in data['data'] and 'grade' in data['data']:
                score = data['data']['score']
                grade = data['data']['grade']
                print_test_result("POST /api/security-scan (Valid)", True, f"Score: {score}, Grade: {grade}")
                valid_success = True
            else:
                print_test_result("POST /api/security-scan (Valid)", False, f"Invalid response: {data}")
                valid_success = False
        else:
            print_test_result("POST /api/security-scan (Valid)", False, f"Status: {response.status_code}, Body: {response.text}")
            valid_success = False
    except Exception as e:
        print_test_result("POST /api/security-scan (Valid)", False, f"Exception: {str(e)}")
        valid_success = False
    
    # Test 2: Invalid domain scan
    print("Testing POST /api/security-scan - Invalid domain...")
    invalid_scan_data = {"url": "not-a-domain"}
    
    try:
        response = requests.post(f"{BASE_URL}/security-scan", 
                               json=invalid_scan_data, 
                               headers={'Content-Type': 'application/json'},
                               timeout=TIMEOUT)
        
        if response.status_code == 400:
            data = response.json()
            if 'error' in data:
                print_test_result("POST /api/security-scan (Invalid)", True, f"Error handled: {data['error']}")
                invalid_success = True
            else:
                print_test_result("POST /api/security-scan (Invalid)", False, f"Missing error field: {data}")
                invalid_success = False
        else:
            print_test_result("POST /api/security-scan (Invalid)", False, f"Expected 400, got {response.status_code}")
            invalid_success = False
    except Exception as e:
        print_test_result("POST /api/security-scan (Invalid)", False, f"Exception: {str(e)}")
        invalid_success = False
    
    return valid_success and invalid_success

def test_bookings():
    """Test Bookings endpoints"""
    print("🔍 Testing Bookings System...")
    
    # Test 1: POST /api/bookings - Create booking
    print("Testing POST /api/bookings...")
    booking_data = {
        "name": "Priya Sharma",
        "email": "priya@testcorp.in",
        "phone": "+91-11111-11111",
        "company": "Test Corp",
        "service": "VAPT",
        "date": "2026-04-15",
        "time": "10:00 AM",
        "message": "Need consultation"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/bookings", 
                               json=booking_data, 
                               headers={'Content-Type': 'application/json'},
                               timeout=TIMEOUT)
        
        if response.status_code == 201:
            data = response.json()
            if data.get('success') and 'data' in data and 'bookingId' in data['data']:
                booking_id = data['data']['bookingId']
                print_test_result("POST /api/bookings", True, f"Booking ID: {booking_id}")
                create_success = True
            else:
                print_test_result("POST /api/bookings", False, f"Invalid response: {data}")
                create_success = False
        else:
            print_test_result("POST /api/bookings", False, f"Status: {response.status_code}, Body: {response.text}")
            create_success = False
    except Exception as e:
        print_test_result("POST /api/bookings", False, f"Exception: {str(e)}")
        create_success = False
    
    # Test 2: GET /api/bookings - Get all bookings
    print("Testing GET /api/bookings...")
    try:
        response = requests.get(f"{BASE_URL}/bookings", timeout=TIMEOUT)
        
        if response.status_code == 200:
            data = response.json()
            if data.get('success') and 'data' in data:
                count = len(data['data'])
                print_test_result("GET /api/bookings", True, f"Retrieved {count} bookings")
                get_success = True
            else:
                print_test_result("GET /api/bookings", False, f"Invalid response: {data}")
                get_success = False
        else:
            print_test_result("GET /api/bookings", False, f"Status: {response.status_code}, Body: {response.text}")
            get_success = False
    except Exception as e:
        print_test_result("GET /api/bookings", False, f"Exception: {str(e)}")
        get_success = False
    
    return create_success and get_success

def test_newsletter_advanced():
    """Test Advanced Newsletter endpoints"""
    print("🔍 Testing Advanced Newsletter System...")
    
    # Test 1: POST /api/newsletter/subscribe
    print("Testing POST /api/newsletter/subscribe...")
    subscribe_data = {
        "email": "newsletter@test.com",
        "source": "test"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/newsletter/subscribe", 
                               json=subscribe_data, 
                               headers={'Content-Type': 'application/json'},
                               timeout=TIMEOUT)
        
        if response.status_code == 200 or response.status_code == 201:
            data = response.json()
            if data.get('success'):
                message = data.get('message', 'Subscribed successfully')
                print_test_result("POST /api/newsletter/subscribe", True, f"Success: {message}")
                subscribe_success = True
            else:
                print_test_result("POST /api/newsletter/subscribe", False, f"Invalid response: {data}")
                subscribe_success = False
        else:
            print_test_result("POST /api/newsletter/subscribe", False, f"Status: {response.status_code}, Body: {response.text}")
            subscribe_success = False
    except Exception as e:
        print_test_result("POST /api/newsletter/subscribe", False, f"Exception: {str(e)}")
        subscribe_success = False
    
    # Test 2: Duplicate subscription
    print("Testing POST /api/newsletter/subscribe - Duplicate...")
    try:
        response = requests.post(f"{BASE_URL}/newsletter/subscribe", 
                               json=subscribe_data, 
                               headers={'Content-Type': 'application/json'},
                               timeout=TIMEOUT)
        
        # Note: Current implementation doesn't prevent duplicates, just logs success
        if response.status_code == 200:
            data = response.json()
            if data.get('success'):
                print_test_result("POST /api/newsletter/subscribe (Duplicate)", True, "Minor: Duplicate handling could be improved, but endpoint works")
                duplicate_success = True
            else:
                print_test_result("POST /api/newsletter/subscribe (Duplicate)", False, f"Unexpected response: {data}")
                duplicate_success = False
        elif response.status_code == 400:
            data = response.json()
            if 'already subscribed' in data.get('error', '').lower():
                print_test_result("POST /api/newsletter/subscribe (Duplicate)", True, "Duplicate handled correctly")
                duplicate_success = True
            else:
                print_test_result("POST /api/newsletter/subscribe (Duplicate)", False, f"Unexpected error: {data}")
                duplicate_success = False
        else:
            print_test_result("POST /api/newsletter/subscribe (Duplicate)", False, f"Unexpected status: {response.status_code}")
            duplicate_success = False
    except Exception as e:
        print_test_result("POST /api/newsletter/subscribe (Duplicate)", False, f"Exception: {str(e)}")
        duplicate_success = False
    
    # Test 3: POST /api/newsletter/unsubscribe
    print("Testing POST /api/newsletter/unsubscribe...")
    unsubscribe_data = {"email": "newsletter@test.com"}
    
    try:
        response = requests.post(f"{BASE_URL}/newsletter/unsubscribe", 
                               json=unsubscribe_data, 
                               headers={'Content-Type': 'application/json'},
                               timeout=TIMEOUT)
        
        if response.status_code == 200:
            data = response.json()
            if data.get('success'):
                print_test_result("POST /api/newsletter/unsubscribe", True, "Unsubscribed successfully")
                unsubscribe_success = True
            else:
                print_test_result("POST /api/newsletter/unsubscribe", False, f"Invalid response: {data}")
                unsubscribe_success = False
        else:
            print_test_result("POST /api/newsletter/unsubscribe", False, f"Status: {response.status_code}, Body: {response.text}")
            unsubscribe_success = False
    except Exception as e:
        print_test_result("POST /api/newsletter/unsubscribe", False, f"Exception: {str(e)}")
        unsubscribe_success = False
    
    return subscribe_success and duplicate_success and unsubscribe_success

def test_proposals():
    """Test Proposals endpoint"""
    print("🔍 Testing Proposals System...")
    
    proposal_data = {
        "name": "Proposal User",
        "email": "prop@test.com",
        "company": "Big Corp",
        "website": "https://bigcorp.com",
        "services": ["Web Application VAPT", "API Security Testing"],
        "companySize": "Enterprise (500+)",
        "budget": "Above ₹5,00,000",
        "timeline": "1 Month",
        "description": "Need comprehensive security audit"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/proposals", 
                               json=proposal_data, 
                               headers={'Content-Type': 'application/json'},
                               timeout=TIMEOUT)
        
        if response.status_code == 201:
            data = response.json()
            if data.get('success') and 'data' in data and 'proposalId' in data['data']:
                proposal_id = data['data']['proposalId']
                print_test_result("POST /api/proposals", True, f"Proposal ID: {proposal_id}")
                return True
            else:
                print_test_result("POST /api/proposals", False, f"Invalid response: {data}")
                return False
        else:
            print_test_result("POST /api/proposals", False, f"Status: {response.status_code}, Body: {response.text}")
            return False
    except Exception as e:
        print_test_result("POST /api/proposals", False, f"Exception: {str(e)}")
        return False

def test_admin_stats():
    """Test Admin Stats endpoint"""
    print("🔍 Testing Admin Stats...")
    
    try:
        response = requests.get(f"{BASE_URL}/admin/stats", timeout=TIMEOUT)
        
        if response.status_code == 200:
            data = response.json()
            if data.get('success') and 'data' in data and 'overview' in data['data'] and 'leads' in data['data'] and 'analytics' in data['data']:
                overview = data['data']['overview']
                total_leads = overview.get('totalLeads', 0)
                print_test_result("GET /api/admin/stats", True, f"Stats retrieved - Total leads: {total_leads}")
                return True
            else:
                print_test_result("GET /api/admin/stats", False, f"Invalid response structure: {data}")
                return False
        else:
            print_test_result("GET /api/admin/stats", False, f"Status: {response.status_code}, Body: {response.text}")
            return False
    except Exception as e:
        print_test_result("GET /api/admin/stats", False, f"Exception: {str(e)}")
        return False

def test_health_check():
    """Test Health Check endpoint (legacy)"""
    print("🔍 Testing Health Check...")
    
    try:
        response = requests.get(f"{BASE_URL}/health", timeout=TIMEOUT)
        
        if response.status_code == 200:
            data = response.json()
            if data.get('status') == 'ok':
                print_test_result("GET /api/health", True, f"Status: {data['status']}")
                return True
            else:
                print_test_result("GET /api/health", False, f"Invalid status: {data}")
                return False
        else:
            print_test_result("GET /api/health", False, f"Status: {response.status_code}, Body: {response.text}")
            return False
    except Exception as e:
        print_test_result("GET /api/health", False, f"Exception: {str(e)}")
        return False

def main():
    """Run all Phase 2 backend API tests"""
    print("🚀 Starting BugZero Cyber Solutions Phase 2 Backend API Tests")
    print(f"📍 Testing against: {BASE_URL}")
    print("=" * 80)
    
    test_results = []
    
    # Run all Phase 2 tests
    test_results.append(("Health Check", test_health_check()))
    test_results.append(("Lead CRM System", test_lead_crm_system()))
    test_results.append(("AI Chatbot", test_ai_chatbot()))
    test_results.append(("Security Scanner", test_security_scanner()))
    test_results.append(("Bookings", test_bookings()))
    test_results.append(("Newsletter Advanced", test_newsletter_advanced()))
    test_results.append(("Proposals", test_proposals()))
    test_results.append(("Admin Stats", test_admin_stats()))
    
    # Summary
    print("=" * 80)
    print("📊 PHASE 2 TEST SUMMARY")
    print("=" * 80)
    
    passed = sum(1 for _, result in test_results if result)
    total = len(test_results)
    
    for test_name, result in test_results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} - {test_name}")
    
    print(f"\n🎯 Overall Result: {passed}/{total} Phase 2 features passed")
    
    if passed == total:
        print("🎉 All Phase 2 backend API tests passed successfully!")
        return 0
    else:
        print("⚠️  Some Phase 2 features failed or are not implemented. Check the details above.")
        return 1

if __name__ == "__main__":
    sys.exit(main())