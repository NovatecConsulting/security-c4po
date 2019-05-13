/* TRUNCATE TABLE SECURITY_TEST; */

/* ID VARCHAR(255) NOT NULL, CATEGORY VARCHAR(255), TITLE VARCHAR(255), DESCRIPTION TEXT, LINK VARCHAR(255) */

/* Information Gathering */
INSERT INTO SECURITY_TEST VALUES('OTG-INFO-001', 'Information Gathering', 'Conduct Search Engine Discovery and Reconnaissance for Information Leakage', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-INFO-002', 'Information Gathering', 'Fingerprint Web Server', '* The simplest and most basic form of identifying a web server is to look at the Server field in the HTTP response header.' ||
                                                                                                    '* The first method consists of observing the ordering of the several headers in the response. Every web server has an inner ordering of the header.' ||
                                                                                                    '* Another useful test to execute involves sending malformed requests or requests of nonexistent pages to the server.' ||
                                                                                                    '* Rather than rely on manual banner grabbing and analysis of the web server headers, a tester can use automated tools to achieve the same results.' ||
                                                                                                    'There are many tests to carry out in order to accurately fingerprint a web server. Luckily, there are tools that automate these tests.' ||
                                                                                                    '"httprint" is one of such tools. httprint uses a signature dictionary that allows it to recognize the type and the version of the web server in use',
                                                                                                    'https://www.owasp.org/index.php/Fingerprint_Web_Server_(OTG-INFO-002)');
INSERT INTO SECURITY_TEST VALUES('OTG-INFO-003', 'Information Gathering', 'Review Webserver Metafiles for Information Leakage', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-INFO-004', 'Information Gathering', 'Enumerate Applications on Webserver', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-INFO-005', 'Information Gathering', 'Review Webpage Comments and Metadata for Information Leakage', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-INFO-006', 'Information Gathering', 'Identify application entry points', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-INFO-007', 'Information Gathering', 'Map execution paths through application', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-INFO-008', 'Information Gathering', 'Fingerprint Web Application Framework', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-INFO-009', 'Information Gathering', 'Fingerprint Web Application', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-INFO-010', 'Information Gathering', 'Map Application Architecture', '', '');
/* Configuration and Deployment Management Testing */
INSERT INTO SECURITY_TEST VALUES('OTG-CONFIG-001', 'Configuration and Deployment Management Testing', 'Test Network/Infrastructure Configuration', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-CONFIG-002', 'Configuration and Deployment Management Testing', 'Test Application Platform Configuration', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-CONFIG-003', 'Configuration and Deployment Management Testing', 'Test File Extensions Handling for Sensitive Information', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-CONFIG-004', 'Configuration and Deployment Management Testing', 'Review Old, Backup and Unreferenced Files for Sensitive Information', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-CONFIG-005', 'Configuration and Deployment Management Testing', 'Enumerate Infrastructure and Application Admin Interfaces', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-CONFIG-006', 'Configuration and Deployment Management Testing', 'Test HTTP Methods', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-CONFIG-007', 'Configuration and Deployment Management Testing', 'Test HTTP Strict Transport Security', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-CONFIG-008', 'Configuration and Deployment Management Testing', 'Test RIA cross domain policy', '', '');
/* Identity Management Testing */
INSERT INTO SECURITY_TEST VALUES('OTG-IDENT-001', 'Identity Management Testing', 'Test Role Definitions', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-IDENT-002', 'Identity Management Testing', 'Test User Registration Process', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-IDENT-003', 'Identity Management Testing', 'Test Account Provisioning Process', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-IDENT-004', 'Identity Management Testing', 'Testing for Account Enumeration and Guessable User Account', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-IDENT-005', 'Identity Management Testing', 'Testing for Weak or unenforced username policy', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-IDENT-006', 'Identity Management Testing', 'Test Permissions of Guest/Training Accounts', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-IDENT-007', 'Identity Management Testing', 'Test Account Suspension/Resumption Process', '', '');
/* Authentication Testing */
INSERT INTO SECURITY_TEST VALUES('OTG-AUTHN-001', 'Authentication Testing', 'Testing for Credentials Transported over an Encrypted Channel', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-AUTHN-002', 'Authentication Testing', 'Testing for default credentials', 'In black box testing the tester knows nothing about the application and its underlying infrastructure. ' ||
                                                                                                               'In reality this is often not true, and some information about the application is known. (...)', '');
INSERT INTO SECURITY_TEST VALUES('OTG-AUTHN-003', 'Authentication Testing', 'Testing for Weak lock out mechanism', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-AUTHN-004', 'Authentication Testing', 'Testing for bypassing authentication schema', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-AUTHN-005', 'Authentication Testing', 'Test remember password functionality', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-AUTHN-006', 'Authentication Testing', 'Testing for Browser cache weakness', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-AUTHN-007', 'Authentication Testing', 'Testing for Weak password policy', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-AUTHN-008', 'Authentication Testing', 'Testing for Weak security question/answer', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-AUTHN-009', 'Authentication Testing', 'Testing for weak password change or reset functionalities', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-AUTHN-010', 'Authentication Testing', 'Testing for Weaker authentication in alternative channel', '', '');
/* Authorization Testing */
INSERT INTO SECURITY_TEST VALUES('OTG-AUTHZ-001', 'Authorization Testing', 'Testing Directory traversal/file include', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-AUTHZ-002', 'Authorization Testing', 'Testing for bypassing authorization schema', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-AUTHZ-003', 'Authorization Testing', 'Testing for Privilege Escalation', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-AUTHZ-004', 'Authorization Testing', 'Testing for Insecure Direct Object References', '', '');
/* Session Management Testing*/
INSERT INTO SECURITY_TEST VALUES('OTG-SESS-001', 'Session Management Testing', 'Testing for Bypassing Session Management Schema', '* Are all Set-Cookie directives tagged as Secure?' ||
                                                                                                                                  '* Do any Cookie operations take place over unencrypted transport?' ||
                                                                                                                                  '* Can the Cookie be forced over unencrypted transport?' ||
                                                                                                                                  '* If so, how does the application maintain security?' ||
                                                                                                                                  '* Are any Cookies persistent?' ||
                                                                                                                                  '* What Expires= times are used on persistent cookies, and are they reasonable?' ||
                                                                                                                                  '* Are cookies that are expected to be transient configured as such?' ||
                                                                                                                                  '* What HTTP/1.1 Cache-Control settings are used to protect Cookies?' ||
                                                                                                                                  '* What HTTP/1.0 Cache-Control settings are used to protect Cookies?', 'https://www.owasp.org/index.php/Testing_for_Session_Management_Schema_(OTG-SESS-001)');
INSERT INTO SECURITY_TEST VALUES('OTG-SESS-002', 'Session Management Testing', 'Testing for Cookies attributes', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-SESS-003', 'Session Management Testing', 'Testing for Session Fixation', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-SESS-004', 'Session Management Testing', 'Testing for Exposed Session Variables', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-SESS-005', 'Session Management Testing', 'Testing for Cross Site Request Forgery', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-SESS-006', 'Session Management Testing', 'Testing for logout functionality', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-SESS-007', 'Session Management Testing', 'Test Session Timeout', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-SESS-008', 'Session Management Testing', 'Testing for Session puzzling', '', '');
/* Input Validation Testing */
INSERT INTO SECURITY_TEST VALUES('OTG-INPVAL-001', 'Input Validation Testing', 'Testing for Reflected Cross Site Scripting', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-INPVAL-002', 'Input Validation Testing', 'Testing for Stored Cross Site Scripting', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-INPVAL-003', 'Input Validation Testing', 'Testing for HTTP Verb Tampering', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-INPVAL-004', 'Input Validation Testing', 'Testing for HTTP Parameter pollution', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-INPVAL-005', 'Input Validation Testing', 'Testing for SQL Injection', '* Oracle Testing' ||
                                                                                                            '* SQL Server Testing' ||
                                                                                                            '* Testing PostgreSQL' ||
                                                                                                            '* MS Access Testing' ||
                                                                                                            '* Testing for NoSQL injection',
                                                                                                            '');
INSERT INTO SECURITY_TEST VALUES('OTG-INPVAL-006', 'Input Validation Testing', 'Testing for LDAP Injection', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-INPVAL-007', 'Input Validation Testing', 'Testing for ORM Injection', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-INPVAL-008', 'Input Validation Testing', 'Testing for XML Injection', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-INPVAL-009', 'Input Validation Testing', 'Testing for SSI Injection', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-INPVAL-010', 'Input Validation Testing', 'Testing for XPath Injection', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-INPVAL-011', 'Input Validation Testing', 'IMAP/SMTP Injection', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-INPVAL-012', 'Input Validation Testing', 'Testing for Code Injection', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-INPVAL-013', 'Input Validation Testing', 'Testing for Command Injection', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-INPVAL-014', 'Input Validation Testing', 'Testing for Buffer overflow', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-INPVAL-015', 'Input Validation Testing', 'Testing for incubated vulnerabilities', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-INPVAL-016', 'Input Validation Testing', 'Testing for HTTP Splitting/Smuggling', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-INPVAL-017', 'Input Validation Testing', 'Testing for HTTP Incoming Requests', '', '');
/* Testing for Error Handling */
INSERT INTO SECURITY_TEST VALUES('OTG-ERR-001', 'Error Handling', 'Analysis of Error Codes', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-ERR-002', 'Error Handling', 'Analysis of Stack Traces', '', '');
/* Testing for weak Cryptography */
INSERT INTO SECURITY_TEST VALUES('OTG-CRYPST-001', 'Cryptography', 'Testing for Weak SSL/TSL Ciphers, Insufficient Transport Layer Protection', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-CRYPST-002', 'Cryptography', 'Testing for Padding Oracle', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-CRYPST-003', 'Cryptography', 'Testing for Sensitive information sent via unencrypted channels', '', '');
/* Business Logic Testing */
INSERT INTO SECURITY_TEST VALUES('OTG-BUSLOGIC-001', 'Business Logic Testing', 'Test Business Logic Data Validation', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-BUSLOGIC-002', 'Business Logic Testing', 'Test Ability to Forge Requests', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-BUSLOGIC-003', 'Business Logic Testing', 'Test Integrity Checks', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-BUSLOGIC-004', 'Business Logic Testing', 'Test for Process Timing', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-BUSLOGIC-005', 'Business Logic Testing', 'Test Number of Times a Function Can be Used Limits', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-BUSLOGIC-006', 'Business Logic Testing', 'Testing for the Circumvention of Work Flows', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-BUSLOGIC-007', 'Business Logic Testing', 'Test Defenses Against Application Mis-use', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-BUSLOGIC-008', 'Business Logic Testing', 'Test Upload of Unexpected File Types', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-BUSLOGIC-009', 'Business Logic Testing', 'Test Upload of Malicious Files', '', '');
/* Client Side Testing */
INSERT INTO SECURITY_TEST VALUES('OTG-CLIENT-001', 'Client Side Testing', 'Testing for DOM based Cross Site Scripting', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-CLIENT-002', 'Client Side Testing', 'Testing for JavaScript Execution', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-CLIENT-003', 'Client Side Testing', 'Testing for HTML Injection', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-CLIENT-004', 'Client Side Testing', 'Testing for Client Side URL Redirect', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-CLIENT-005', 'Client Side Testing', 'Testing for CSS Injection', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-CLIENT-006', 'Client Side Testing', 'Testing for Client Side Resource Manipulation', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-CLIENT-007', 'Client Side Testing', 'Test Cross Origin Resource Sharing', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-CLIENT-008', 'Client Side Testing', 'Testing for Cross Site Flashing', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-CLIENT-009', 'Client Side Testing', 'Testing for Clickjacking', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-CLIENT-010', 'Client Side Testing', 'Testing WebSockets', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-CLIENT-011', 'Client Side Testing', 'Test Web Messaging', '', '');
INSERT INTO SECURITY_TEST VALUES('OTG-CLIENT-012', 'Client Side Testing', 'Test Local Storage', '', '');
