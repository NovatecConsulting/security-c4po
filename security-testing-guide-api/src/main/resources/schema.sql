DROP TABLE IF EXISTS PROJECT;
DROP TABLE IF EXISTS SECURITY_TEST;
DROP TABLE IF EXISTS TEST_STATUS;
DROP TABLE IF EXISTS FINDING;

CREATE TABLE IF NOT EXISTS PROJECT (
    ID         VARCHAR(36) NOT NULL,
    CLIENT     VARCHAR(255) NOT NULL,
    TITLE      VARCHAR(255) NOT NULL,
    CREATED_AT DATETIME,
    -- DETAILS
    TESTER_NAME VARCHAR(255),
    SELECTED_LOGO_TESTER INT,
    SELECTED_LOGO_CLIENT INT,
    PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS SECURITY_TEST (
    ID VARCHAR(32) NOT NULL,
    CATEGORY VARCHAR(255),
    TITLE VARCHAR(255),
    DESCRIPTION TEXT,
    LINK VARCHAR(255),
    PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS TEST_STATUS (
    ID VARCHAR(36) NOT NULL,
    TEST_ID VARCHAR(255) NOT NULL,
    PROJECT_ID VARCHAR(255) NOT NULL,
    TEST_PROGRESS VARCHAR(255) NOT NULL,
    CREATED DATETIME,
    PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS FINDING (
    ID VARCHAR(36) NOT NULL,
    TEST_ID VARCHAR(255) NOT NULL,
    PROJECT_ID VARCHAR(255) NOT NULL,
    TITLE VARCHAR(255),
    SEVERITY VARCHAR(255),
    DESCRIPTION TEXT,
    REPRODUCTION TEXT,
    IMPACT TEXT,
    MITIGATION TEXT,
    AFFECTED_URLS TEXT,
    CREATED DATETIME,
    PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS SECURITY_TEST_PERFORMED (
    ID VARCHAR(255) NOT NULL,
    PROJECT_ID VARCHAR(255) NOT NULL,
    TEST_ID VARCHAR(255) NOT NULL,
    CHECKED BOOLEAN(1) NOT NULL,
    COMMENT TEXT,
    PRIMARY KEY (ID)
);

-- TODO: Why does this only work here and not in test-data.sql?
INSERT INTO PROJECT VALUES('c02d0059-326f-4013-a2b1-0954e308bd00', 'E Corp', 'Some Mock API (v1.3) Scanning', parsedatetime('13-12-2018 17:04:18', 'dd-MM-yyyy hh:mm:ss'), 'Nova Tester', 1, 2);

INSERT INTO FINDING VALUES('71578254-9851-45cc-82f6-98e53d6ed27b', 'OTG-INFO-002', 'c02d0059-326f-4013-a2b1-0954e308bd00',
'Webserver reveals Apache version', 'LOW', '', 'Run the following command in a terminal: \"nc <ip> 80\"',
'An attacker could run exploits against the server more easily, if the current version is outdated and revealed.',
'Hide version (Apache config)', '-', parsedatetime('02-05-2019 11:03:11', 'dd-MM-yyyy hh:mm:ss'));

INSERT INTO FINDING VALUES('6ec9ba3b-c1d4-4424-b867-dd98ea5f68c6', 'OTG-INFO-002', 'c02d0059-326f-4013-a2b1-0954e308bd00',
'HTTPS certificate will run out in less than 10 days', 'INFO', '', 'Click on lock in browser and show certificate',
'The website might not be accessible if the cert is invalid',
'Create new certificate', 'https://wwww.myexample.local', parsedatetime('02-05-2019 11:03:11', 'dd-MM-yyyy hh:mm:ss'));

INSERT INTO FINDING VALUES('bb457cd5-87d2-487c-929a-9394883f3b52', 'OTG-INFO-002', 'c02d0059-326f-4013-a2b1-0954e308bd00',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' ||
 ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 'CRITICAL', '', '',
 '', '', '', parsedatetime('04-05-2019 01:18:34', 'dd-MM-yyyy hh:mm:ss'));

INSERT INTO TEST_STATUS VALUES('0cad9d3f-256f-42ce-83e6-1a618966078b', 'OTG-INFO-002', 'c02d0059-326f-4013-a2b1-0954e308bd00', 'REPORTED', parsedatetime('11-06-2019 11:18:34', 'dd-MM-yyyy hh:mm:ss'));
INSERT INTO TEST_STATUS VALUES('75c99e08-7113-45ba-a415-4aed8119e885', 'OTG-INFO-002', 'c02d0059-326f-4013-a2b1-0954e308bd00', 'UNDER_REVIEW', parsedatetime('11-06-2019 13:19:24', 'dd-MM-yyyy hh:mm:ss'));
