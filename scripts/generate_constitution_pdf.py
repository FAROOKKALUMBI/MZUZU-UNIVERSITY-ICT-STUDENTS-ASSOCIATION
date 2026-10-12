import os
import shutil
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas

os.makedirs('public/documents', exist_ok=True)
pdf_path = 'public/documents/MUISA_Constitution.pdf'

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont('Helvetica', 8.5)
        self.setFillColor(colors.HexColor('#4B5563'))

        # Header (Top)
        self.drawString(54, 745, 'Mzuzu University ICT Student Association (MUISA)')
        self.drawRightString(612 - 54, 745, 'Constitution')
        self.setStrokeColor(colors.HexColor('#1B6B35'))
        self.setLineWidth(1)
        self.line(54, 738, 612 - 54, 738)

        # Footer (Bottom)
        self.setStrokeColor(colors.HexColor('#E5E7EB'))
        self.setLineWidth(0.75)
        self.line(54, 52, 612 - 54, 52)
        self.setFont('Helvetica-Oblique', 8.5)
        self.drawString(54, 40, 'Shaping the future through digital innovation and impact')
        self.setFont('Helvetica', 8.5)
        self.drawRightString(612 - 54, 40, f'Page {self._pageNumber}')
        self.restoreState()

doc = SimpleDocTemplate(
    pdf_path,
    pagesize=letter,
    leftMargin=54,
    rightMargin=54,
    topMargin=68,
    bottomMargin=62
)

primary_green = colors.HexColor('#1B6B35')
accent_gold = colors.HexColor('#D97706')
text_dark = colors.HexColor('#1F2937')

title_style = ParagraphStyle(
    'DocTitle',
    fontName='Helvetica-Bold',
    fontSize=22,
    leading=26,
    alignment=1,
    textColor=primary_green,
    spaceAfter=4
)

subtitle_style = ParagraphStyle(
    'DocSubTitle',
    fontName='Helvetica-Bold',
    fontSize=13,
    leading=17,
    alignment=1,
    textColor=text_dark,
    spaceAfter=4
)

version_style = ParagraphStyle(
    'DocVersion',
    fontName='Helvetica',
    fontSize=9.5,
    leading=13,
    alignment=1,
    textColor=colors.HexColor('#4B5563'),
    spaceAfter=15
)

article_style = ParagraphStyle(
    'ArticleHeading',
    fontName='Helvetica-Bold',
    fontSize=13,
    leading=17,
    textColor=primary_green,
    spaceBefore=14,
    spaceAfter=8,
    keepWithNext=True
)

section_style = ParagraphStyle(
    'SectionHeading',
    fontName='Helvetica-Bold',
    fontSize=10.5,
    leading=14,
    textColor=text_dark,
    spaceBefore=9,
    spaceAfter=4,
    keepWithNext=True
)

body_style = ParagraphStyle(
    'BodyDark',
    fontName='Helvetica',
    fontSize=9.5,
    leading=13.5,
    textColor=text_dark,
    spaceAfter=6
)

bullet_style = ParagraphStyle(
    'BulletText',
    fontName='Helvetica',
    fontSize=9,
    leading=13,
    textColor=text_dark,
    leftIndent=15,
    firstLineIndent=-10,
    spaceAfter=3.5
)

story = []

# --- PAGE 1 ---
story.append(Paragraph('MZUZU UNIVERSITY<br/>ICT STUDENT ASSOCIATION', subtitle_style))
story.append(Paragraph('MUISA', title_style))
story.append(Paragraph('CONSTITUTION', ParagraphStyle('ConstTitle', fontName='Helvetica-Bold', fontSize=16, leading=20, alignment=1, textColor=primary_green, spaceAfter=8)))
story.append(Paragraph('Adopted: 7th June 2026 &nbsp;|&nbsp; Version 1.0', version_style))
story.append(HRFlowable(width='100%', thickness=1.5, color=primary_green, spaceAfter=14))

story.append(Paragraph('Vision &amp; Mission', article_style))
story.append(Paragraph('<b>Vision</b>', section_style))
story.append(Paragraph('To be the leading student-driven ICT community in Malawi producing skilled, innovative, and entrepreneurial graduates who create real impact through technology.', body_style))

story.append(Paragraph('<b>Mission</b>', section_style))
story.append(Paragraph('MUISA exists to build technical skills, foster collaboration, organise transformative trainings and events, develop real-world projects, promote innovation and entrepreneurship, connect students to professional opportunities, help members build portfolios and experience, and represent Mzuzu University ICT students with professionalism, integrity, and excellence.', body_style))

story.append(Paragraph('Preamble', article_style))
story.append(Paragraph('We, the ICT students of Mzuzu University, recognise that technology is the engine of development and that student communities are where the next generation of builders, innovators, and leaders are shaped. We recognise that for our community to produce real value — not just for ourselves, but for our institution and our nation — we must be organised, purposeful, and accountable.', body_style))
story.append(Paragraph('We therefore resolve to establish the Mzuzu University ICT Student Association (MUISA) not as a political body, but as a productive one. This Constitution is our commitment to keep every leader and every member anchored to a single question: <i>Are we building?</i>', body_style))
story.append(Paragraph('This Constitution shall be the supreme governing instrument of MUISA. It shall be binding upon all members, officers, and committees of the Association.', body_style))

story.append(Paragraph('Article I — Name, Identity &amp; Purpose', article_style))
story.append(Paragraph('<b>Section 1 — Name</b>', section_style))
story.append(Paragraph('The full official name of this organisation is the Mzuzu University ICT Student Association, hereafter referred to as "MUISA".', body_style))

story.append(Paragraph('<b>Section 2 — Affiliation</b>', section_style))
story.append(Paragraph('MUISA is an officially recognised student organisation of Mzuzu University, operating in compliance with the University\'s rules, regulations, and policies governing student associations.', body_style))

story.append(Paragraph('<b>Section 3 — Motto</b>', section_style))
story.append(Paragraph('"Shaping the future through digital innovation and impact."', body_style))

story.append(PageBreak())

# --- PAGE 2 ---
story.append(Paragraph('<b>Section 4 — Core Objectives</b>', section_style))
story.append(Paragraph('MUISA shall exist to:', body_style))
bullets_obj = [
    '• Build the technical skills of its members through structured programmes and hands-on learning.',
    '• Foster a culture of collaboration, knowledge-sharing, and peer support among ICT students.',
    '• Organise impactful trainings, workshops, seminars, hackathons, and community events.',
    '• Develop real-world projects that solve genuine problems and demonstrate member capabilities.',
    '• Promote a spirit of innovation and entrepreneurship within and beyond the University.',
    '• Connect members to internships, employment opportunities, mentors, and industry networks.',
    '• Help members build professional portfolios and gain practical experience before graduation.',
    '• Represent Mzuzu University ICT students professionally within the institution and to the wider public.'
]
for b in bullets_obj:
    story.append(Paragraph(b, bullet_style))

story.append(Paragraph('<b>Section 5 — The MUISA Standard</b>', section_style))
story.append(Paragraph('Leadership of MUISA shall at all times be judged against this core purpose. If at any point the Association becomes primarily political rather than productive, any member may invoke this Section at a General Meeting to call the leadership back to the mission.', body_style))

story.append(Paragraph('<b>Section 6 — Non-Profit Status</b>', section_style))
story.append(Paragraph('MUISA shall operate as a non-profit student body. No earnings or assets of the Association shall accrue to the personal benefit of any individual member or officer.', body_style))

story.append(Paragraph('Article II — Membership', article_style))
story.append(Paragraph('<b>Section 1 — Eligibility</b>', section_style))
story.append(Paragraph('Ordinary membership of MUISA shall be open to:<br/>a. All students currently enrolled in Bachelors of Science in ICT and Education ICT.<br/>b. Students enrolled in any other programme who demonstrate genuine interest in ICT, subject to approval by the Executive Board.', body_style))

story.append(Paragraph('<b>Section 2 — Registration</b>', section_style))
story.append(Paragraph('A student becomes a member of MUISA by:<br/>c. Completing an official MUISA membership registration form as provided by the Secretary;<br/>d. Paying the prescribed annual membership subscription fee within the period stipulated by the Treasurer; and<br/>e. Accepting and agreeing to be bound by the terms of this Constitution.', body_style))

story.append(Paragraph('<b>Section 3 — Membership Fees</b>', section_style))
story.append(Paragraph('The annual membership subscription fee shall be set by the Executive Board at the beginning of each academic year and communicated to all eligible students. The fee may be reviewed at any Annual General Meeting by ordinary resolution. This registration fee shall be used for the following activities:', body_style))
for b in ['• Certification', '• Association ID', '• Administrative activities', '• Social welfare']:
    story.append(Paragraph(b, bullet_style))

story.append(PageBreak())

# --- PAGE 3 ---
story.append(Paragraph('<b>Section 4 — Rights of Paid-Up Members</b>', section_style))
story.append(Paragraph('All paid-up members in good standing shall have the right to:', body_style))
rights = [
    '• Attend all General Meetings and vote on all matters put to a membership vote.',
    '• Stand for election or be appointed to any position in the Association, subject to eligibility criteria in Article IV.',
    '• Participate in all activities, trainings, events, projects, and programmes organised by MUISA.',
    '• Access MUISA resources, communications, and opportunities.',
    '• Raise grievances and be heard in accordance with the procedures in Article VII.'
]
for r in rights:
    story.append(Paragraph(r, bullet_style))

story.append(Paragraph('<b>Section 5 — Responsibilities of Members</b>', section_style))
story.append(Paragraph('Every member of MUISA shall:', body_style))
resps = [
    '• Uphold this Constitution and all policies of the Association.',
    '• Conduct themselves with respect, integrity, and professionalism in all MUISA activities.',
    '• Pay membership dues and any applicable fines promptly.',
    '• Actively contribute to the mission of building skills, collaboration, and real projects.'
]
for r in resps:
    story.append(Paragraph(r, bullet_style))

story.append(Paragraph('<b>Section 6 — Honorary Membership</b>', section_style))
story.append(Paragraph('The Executive Board may, by a two-thirds majority vote, confer honorary membership upon any individual who has rendered exceptional service or contribution to MUISA or to ICT development in Malawi. Honorary members shall not be required to pay dues and shall not hold voting rights.', body_style))

story.append(Paragraph('<b>Section 7 — Termination of Membership</b>', section_style))
story.append(Paragraph('A member shall cease to be a member of MUISA upon:<br/>f. Voluntary resignation by written notice to the Secretary;<br/>g. Graduation or discontinuation of studies at Mzuzu University, unless the Board grants alumni status by resolution;<br/>h. Failure to pay the annual subscription within 30 days of the prescribed deadline, unless exempted by the Board on grounds of financial hardship; or<br/>i. Expulsion following disciplinary proceedings as prescribed in Article VII.', body_style))

story.append(Paragraph('<b>Section 8 — Non-Discrimination</b>', section_style))
story.append(Paragraph('Membership of MUISA shall be open to all eligible students without discrimination on the basis of gender, tribe, religion, nationality, disability, marital status, political affiliation, or any other characteristic unrelated to academic standing or legitimate membership criteria.', body_style))

story.append(PageBreak())

# --- PAGE 4 ---
story.append(Paragraph('Article III — Executive Structure &amp; Roles', article_style))
story.append(Paragraph('The governance and day-to-day management of MUISA shall be vested in an Executive Board ("the Board"). The team is collectively accountable for whether the Association is building, or merely existing.', body_style))

story.append(Paragraph('<b>Section 1 — Composition of the Executive Board</b>', section_style))
story.append(Paragraph('The Executive Board shall consist of ten (10) positions:', body_style))
exec_pos = [
    '• President', '• Secretary', '• Treasurer', '• Technical Lead', '• Cybersecurity Lead',
    '• Training Coordinator', '• Event Coordinator', '• Social Welfare Director',
    '• PR &amp; Social Media Officer', '• Project Manager'
]
for ep in exec_pos:
    story.append(Paragraph(ep, bullet_style))
story.append(Paragraph('The Board may, by a two-thirds majority, create additional positions as needs evolve, subject to ratification at the next General Meeting.', body_style))

story.append(Paragraph('<b>Section 2 — President</b>', section_style))
story.append(Paragraph('The President is responsible for the overall vision and strategic direction of MUISA. Specifically, the President shall:', body_style))
pres_duties = [
    '• Provide leadership and direction that keeps the Association anchored to its core mission (Article I, Section 4).',
    '• Preside over all General Meetings and Executive Board meetings.',
    '• Serve as the primary spokesperson and external representative of MUISA.',
    '• Sign official documents, letters, and agreements on behalf of the Association.',
    '• Hold all Board members accountable to their roles and deliverables.',
    '• Cast a deciding vote in the event of a tie at any meeting.',
    '• Submit a semester activity report to the membership at each Ordinary General Meeting.'
]
for pd in pres_duties:
    story.append(Paragraph(pd, bullet_style))

story.append(Paragraph('<b>Section 3 — Secretary</b>', section_style))
story.append(Paragraph('The Secretary is responsible for administration and records. The Secretary shall:', body_style))
sec_duties = [
    '• Record accurate and complete minutes of all Board and General Meetings.',
    '• Maintain a current and official register of all MUISA members.',
    '• Issue meeting notices, agendas, and official correspondence in a timely manner.',
    '• Manage all incoming and outgoing official communications of the Association.',
    '• Safeguard and organise all official MUISA records, documents, and archives.',
    '• Follow up on action items from meetings and report on their completion.'
]
for sd in sec_duties:
    story.append(Paragraph(sd, bullet_style))

story.append(PageBreak())

# --- PAGE 5 ---
story.append(Paragraph('<b>Section 4 — Treasurer</b>', section_style))
story.append(Paragraph('The Treasurer is responsible for all financial matters of MUISA. The Treasurer shall:', body_style))
tres_duties = [
    '• Collect, receipt, and securely deposit all monies due to the Association.',
    '• Maintain accurate, up-to-date, and transparent financial records.',
    '• Present a financial statement at every Ordinary General Meeting.',
    '• Present a full audited statement of accounts at the Annual General Meeting.',
    '• Manage the MUISA bank account jointly with the President in accordance with Article VI.',
    '• Prepare and submit budgets for all planned activities to the Board for approval.',
    '• Ensure no funds are disbursed without proper authorisation as prescribed in Article VI.'
]
for td in tres_duties:
    story.append(Paragraph(td, bullet_style))

story.append(Paragraph('<b>Section 5 — Technical Lead</b>', section_style))
story.append(Paragraph('The Technical Lead is responsible for all technical operations of MUISA. The Technical Lead shall:', body_style))
tech_duties = [
    '• Lead and coordinate all technical projects, coding initiatives, and technology-related activities.',
    '• Identify and champion project ideas that are real, buildable, and impactful.',
    '• Manage technical teams and ensure project timelines and deliverables are met.',
    '• Maintain and oversee any MUISA technical infrastructure (websites, repositories, systems).',
    '• Mentor members in technical skills and serve as a resource for ICT problem-solving.',
    '• Represent MUISA in technical competitions and external ICT engagements.'
]
for tcd in tech_duties:
    story.append(Paragraph(tcd, bullet_style))

story.append(Paragraph('<b>Section 6 — Cybersecurity Lead</b>', section_style))
story.append(Paragraph('The Cybersecurity Lead is responsible for security awareness, practice, and education within MUISA. The Cybersecurity Lead shall:', body_style))
cyber_duties = [
    '• Organise cybersecurity awareness sessions, CTF (Capture the Flag) competitions, and security workshops.',
    '• Ensure MUISA\'s digital assets, accounts, and systems are handled securely.',
    '• Advise the Board on any security risks or concerns related to MUISA\'s digital operations.',
    '• Build members\' knowledge and practical skills in cybersecurity and ethical hacking.',
    '• Liaise with relevant departments or external partners on cybersecurity matters.'
]
for cd in cyber_duties:
    story.append(Paragraph(cd, bullet_style))

story.append(Paragraph('<b>Section 7 — Training Coordinator</b>', section_style))
story.append(Paragraph('The Training Coordinator is responsible for all learning and development activities of MUISA. The Training Coordinator shall:', body_style))
train_duties = [
    '• Design and coordinate a structured training calendar each semester, covering relevant ICT skills.',
    '• Source facilitators, trainers, and resource persons for workshops and bootcamps.',
    '• Ensure trainings are practical, skill-building, and aligned with the MUISA mission.',
    '• Maintain records of all trainings conducted and attendance thereof.',
    '• Gather feedback from members after each training to improve future sessions.',
    '• Identify and pursue external training opportunities and certifications for members.'
]
for trd in train_duties:
    story.append(Paragraph(trd, bullet_style))

story.append(PageBreak())

# --- PAGE 6 ---
story.append(Paragraph('<b>Section 8 — Event Coordinator</b>', section_style))
story.append(Paragraph('The Event Coordinator is responsible for the planning and execution of all MUISA events and programmes. The Event Coordinator shall:', body_style))
ev_duties = [
    '• Plan, coordinate, and execute all MUISA events including hackathons, competitions, exhibitions, and socials.',
    '• Develop event proposals and budgets and submit them for Board approval.',
    '• Coordinate logistics, venue, equipment, and catering for all events.',
    '• Work closely with the PR &amp; Social Media Officer to publicise all events.',
    '• Conduct a post-event review and submit a report to the Board within seven (7) days of each major event.'
]
for ed in ev_duties:
    story.append(Paragraph(ed, bullet_style))

story.append(Paragraph('<b>Section 9 — PR &amp; Social Media Officer</b>', section_style))
story.append(Paragraph('The PR &amp; Social Media Officer is responsible for the public image and communications of MUISA. The PR &amp; Social Media Officer shall:', body_style))
pr_duties = [
    '• Manage all MUISA social media platforms, websites, and digital presence.',
    '• Create and publish engaging content that showcases member projects, events, and achievements.',
    '• Maintain and strengthen MUISA\'s brand identity and public image.',
    '• Handle all media relations, press releases, and public announcements.',
    '• Ensure all members are informed of Association news, opportunities, and activities through appropriate channels.',
    '• Document MUISA activities through photography, video, and written records for archiving and promotion.'
]
for prd in pr_duties:
    story.append(Paragraph(prd, bullet_style))

story.append(Paragraph('<b>Section 10 — Project Manager</b>', section_style))
story.append(Paragraph('The Project Manager is responsible for the execution and delivery of MUISA\'s projects and initiatives. The Project Manager shall:', body_style))
pm_duties = [
    '• Maintain a live register of all active MUISA projects, their timelines, owners, and status.',
    '• Coordinate project teams, set milestones, and track progress against agreed deliverables.',
    '• Report project status to the Board at every Board meeting.',
    '• Identify risks and blockers in ongoing projects and escalate as needed.',
    '• Ensure completed projects are documented, showcased, and added to the MUISA portfolio.',
    '• Champion a culture of finishing ensuring projects started are projects completed.'
]
for pmd in pm_duties:
    story.append(Paragraph(pmd, bullet_style))

story.append(Paragraph('<b>Section 11 — Faculty Advisor (Patron)</b>', section_style))
story.append(Paragraph('MUISA shall have a Faculty Advisor, who shall be a member of the ICT academic staff at Mzuzu University, appointed by the Head of Department in consultation with the Board. The Faculty Advisor shall serve in an advisory and supervisory capacity without voting rights, and shall assist the Board in liaising with the University administration.', body_style))

story.append(Paragraph('<b>Section 12 — Collective Accountability</b>', section_style))
story.append(Paragraph('The Executive Board shall meet at least once per month during the academic term. Every Board member shall come to each meeting with a written update on their area. A Board member who fails to deliver on their mandate without valid reason for two consecutive months may be subject to a vote of no confidence by the Board, initiating removal proceedings under Article IV, Section 8.', body_style))

story.append(Paragraph('<b>Section 13 — Social Welfare Director</b>', section_style))
story.append(Paragraph('The Social Welfare Officer shall promote the welfare and wellbeing of members, provide support to students facing academic or personal challenges, and refer members to appropriate university support services when necessary. The officer shall foster an inclusive and welcoming environment for all members, address issues of discrimination or exclusion, serve as a link between members and the Executive Committee, gather member feedback, encourage participation among inactive members, and promote awareness of available bursaries, scholarships, and other student support opportunities.', body_style))

story.append(PageBreak())

# --- PAGE 7 ---
story.append(Paragraph('Article IV — Elections &amp; Term of Office', article_style))
story.append(Paragraph('<b>Section 1 — Eligibility to Stand</b>', section_style))
story.append(Paragraph('A candidate for any Executive Board position must:<br/>j. Be a paid-up, registered MUISA member in good standing;<br/>k. Be currently enrolled as a student at Mzuzu University;<br/>l. Not be serving any suspension or disciplinary sanction at the time of candidacy; and<br/>m. Formally accept their nomination in writing to the Secretary.<br/>n. Students that are in their final year are not eligible to stand.', body_style))

story.append(Paragraph('<b>Section 2 — Election Schedule</b>', section_style))
story.append(Paragraph('General elections for all Board positions shall be held once per academic year, during the second semester, at least six (6) weeks before the end of the academic year. The outgoing Board shall set the exact election date and communicate it to all members with no less than fourteen (14) days\' notice.', body_style))

story.append(Paragraph('<b>Section 3 — Nomination Process</b>', section_style))
story.append(Paragraph('Nominations shall be open for no less than seven (7) days prior to election day. Self-nominations are permitted and submitted in writing to the Secretary.', body_style))

story.append(Paragraph('<b>Section 4 — Voting</b>', section_style))
story.append(Paragraph('Elections shall be conducted by secret ballot. Each paid-up member in good standing shall be entitled to one (1) vote per contested position. The candidate receiving a majority of valid votes cast shall be declared elected. In the event of a tie, an immediate run-off vote shall be held between the tied candidates. An electoral board shall be selected to ensure there are transparent and accountable elections.', body_style))

story.append(Paragraph('<b>Section 5 — Term of Office</b>', section_style))
story.append(Paragraph('Each Board member shall serve a term of one (1) academic year from the date of installation. No officer shall hold the same position for more than two (2) consecutive terms.', body_style))

story.append(Paragraph('<b>Section 6 — Handover</b>', section_style))
story.append(Paragraph('Newly elected officers shall be installed at a formal handover within fourteen (14) days of the election results. The outgoing officer in each role shall brief their successor, hand over all relevant documents and assets, and submit a final activity report to the Secretary.', body_style))

story.append(Paragraph('<b>Section 7 — Vacancy &amp; Succession</b>', section_style))
story.append(Paragraph('Should a vacancy arise mid-term due to resignation, removal, incapacitation, or any other reason, the Board shall within fourteen (14) days either call a by-election or appoint an acting officer by a two-thirds majority resolution to serve the remainder of the term.', body_style))

story.append(Paragraph('<b>Section 8 — Removal from Office</b>', section_style))
story.append(Paragraph('An officer may be removed from office by a two-thirds majority vote of members present and voting at a Special General Meeting called for that purpose, following due process as prescribed in Article VII. The affected officer must be given written notice of the charges and an opportunity to be heard before any vote is taken.', body_style))

story.append(PageBreak())

# --- PAGE 8 ---
story.append(Paragraph('Article V — Meetings &amp; Quorum', article_style))
story.append(Paragraph('<b>Section 1 — Types of Meetings</b>', section_style))
story.append(Paragraph('MUISA shall hold the following categories of meetings:', body_style))
meet_types = [
    '• Annual General Meeting (AGM) — held once per academic year;',
    '• Ordinary General Meetings — held at least once per semester;',
    '• Special General Meetings — convened as the need arises; and',
    '• Executive Board Meetings — held at least twice per month during the academic term.'
]
for mt in meet_types:
    story.append(Paragraph(mt, bullet_style))

story.append(Paragraph('<b>Section 2 — Notice</b>', section_style))
story.append(Paragraph('Members shall be notified of all General Meetings at least seven (7) days in advance via official MUISA communication channels. Notice shall include the date, time, venue, and agenda. For Special General Meetings, a minimum of 48 hours\' notice is required, except in genuine emergencies as declared by the President.', body_style))

story.append(Paragraph('<b>Section 3 — Quorum</b>', section_style))
story.append(Paragraph('For General Meetings, a quorum shall be fifty percent (50%) of all paid-up members in good standing. For Board meetings, a quorum shall be a simple majority of Board members. No official business shall be transacted in the absence of a quorum.', body_style))

story.append(Paragraph('<b>Section 4 — Conduct of Meetings</b>', section_style))
story.append(Paragraph('All meetings shall be conducted in accordance with basic parliamentary procedure. The President, the event organizer, or in their absence the Secretary, shall preside. Minutes shall be recorded by the Secretary and confirmed at the next meeting before any other business is transacted.', body_style))

story.append(Paragraph('<b>Section 5 — Attendance, Punctuality &amp; Fines</b>', section_style))
story.append(Paragraph('All members are expected to attend General Meetings punctually. The following rules apply:<br/>• A grace period of fifteen (15) minutes shall apply to all General Meetings.<br/>• Members arriving after the grace period, without having given at least one (1) hour\'s prior notice, shall be liable to a late fine as prescribed by the Board.<br/>• Members who do not attend without communicating a valid reason in advance shall be liable to an absence fine as prescribed by the Board.<br/>• All fines shall be paid to the Treasurer and deposited into the MUISA account within seven (7) days.', body_style))

story.append(Paragraph('<b>Section 6 — Voting at General Meetings</b>', section_style))
story.append(Paragraph('Unless otherwise specified in this Constitution, all resolutions at General Meetings shall be decided by a simple majority of members present and voting. The presiding officer shall have a casting vote in the event of a tie.', body_style))

story.append(Paragraph('<b>Section 7 — Special General Meeting</b>', section_style))
story.append(Paragraph('A Special General Meeting may be convened by the President, by a majority resolution of the Board, or upon a written petition signed by at least one-third (1/3) of paid-up members. Only the business stated in the notice shall be transacted at a Special General Meeting.', body_style))

story.append(PageBreak())

# --- PAGE 9 ---
story.append(Paragraph('Article VI — Finance &amp; Treasury', article_style))
story.append(Paragraph('<b>Section 1 — Sources of Income</b>', section_style))
story.append(Paragraph('MUISA\'s funds may be derived from:', body_style))
sources = [
    '• Annual membership subscription fees;',
    '• Meeting fines and penalties as prescribed by the Board;',
    '• Proceeds from fundraising activities and events;',
    '• Grants, donations, and sponsorships from individuals, companies, or organisations;',
    '• Allocations from Mzuzu University\'s student activities fund, where applicable; and',
    '• Any other lawful source approved by the Executive Board.'
]
for src in sources:
    story.append(Paragraph(src, bullet_style))

story.append(Paragraph('<b>Section 2 — Bank Account</b>', section_style))
story.append(Paragraph('MUISA shall maintain an official bank account in its name at a registered financial institution. All funds shall be deposited into this account within seven (7) days of receipt. The account shall require trio signatories: the Treasurer, the Secretary, and the President.', body_style))

story.append(Paragraph('<b>Section 3 — Expenditure Controls</b>', section_style))
story.append(Paragraph('All expenditures shall be subject to the following controls:<br/>o. Every expenditure must be supported by a written request or a Board-approved budget.<br/>p. All payments must be accompanied by an official receipt or proof of payment.<br/>q. Expenditures exceeding a threshold set by the Board at the start of each financial year shall require approval by a majority Board vote before the funds are committed.<br/>r. No single officer shall authorise expenditures unilaterally above the threshold amount.', body_style))

story.append(Paragraph('<b>Section 4 — Financial Reporting</b>', section_style))
story.append(Paragraph('The Treasurer shall present a financial statement at every Ordinary General Meeting. At the Annual General Meeting, a full audited statement of accounts shall be presented. The financial year of MUISA shall run concurrent with the academic year of Mzuzu University.', body_style))

story.append(Paragraph('<b>Section 5 — Audit</b>', section_style))
story.append(Paragraph('MUISA\'s accounts shall be audited at least once per academic year by an audit committee of three (3) paid-up members appointed by the General Meeting, none of whom shall be the Treasurer, the Secretary, or the President. The audit report shall be presented to members at the AGM.', body_style))

story.append(Paragraph('<b>Section 6 — Dissolution of Assets</b>', section_style))
story.append(Paragraph('In the event of dissolution, all remaining assets and funds after settlement of all liabilities shall be transferred to a charitable cause or ICT-related student initiative as determined by a two-thirds majority vote at the dissolution meeting. No funds shall be distributed to individual members.', body_style))

story.append(PageBreak())

# --- PAGE 10 ---
story.append(Paragraph('Article VII — Discipline &amp; Grievances', article_style))
story.append(Paragraph('<b>Section 1 — Expected Conduct</b>', section_style))
story.append(Paragraph('All members and officers of MUISA are expected to uphold the highest standards of integrity, respect, and professionalism at all times. The following shall constitute misconduct:', body_style))
misconducts = [
    '• Misappropriation, theft, or misuse of MUISA funds, property, or resources;',
    '• Conduct that brings or is likely to bring MUISA into disrepute;',
    '• Persistent non-attendance at meetings without valid excuse;',
    '• Harassment, bullying, intimidation, or abuse of any member;',
    '• Breach of any provision of this Constitution or MUISA\'s official policies;',
    '• Deliberate obstruction of MUISA activities or projects; and',
    '• Any act that undermines the integrity of an election or official MUISA process.'
]
for mc in misconducts:
    story.append(Paragraph(mc, bullet_style))

story.append(Paragraph('<b>Section 2 — Disciplinary Committee</b>', section_style))
story.append(Paragraph('Upon the arising of a disciplinary matter, the Executive Board shall appoint a Disciplinary Committee of three (3) members who are not directly involved in the matter, to investigate and recommend a course of action to the Board.', body_style))

story.append(Paragraph('<b>Section 3 — Due Process</b>', section_style))
story.append(Paragraph('The disciplinary process shall proceed as follows:<br/>s. The complainant shall submit a written complaint to the Secretary, stating the alleged misconduct and any supporting evidence.<br/>t. The Secretary shall formally notify the accused member in writing within seven (7) days, setting out the specific allegations.<br/>u. The accused shall be given at least seven (7) days to prepare and submit a written response.<br/>v. The Disciplinary Committee shall convene a hearing at which both parties may present their case. The accused has the right to be present, to be heard, and to call witnesses.<br/>w. The Committee shall deliberate and submit written recommendations to the Board within fourteen (14) days of the hearing.<br/>x. The Board shall make a final determination by a two-thirds majority vote and notify the accused in writing within seven (7) days.', body_style))

story.append(Paragraph('<b>Section 4 — Sanctions</b>', section_style))
story.append(Paragraph('Depending on the severity and nature of the misconduct, the Board may impose one or more of the following sanctions:<br/>• Formal written warning;<br/>• Monetary fine as prescribed by the Board;<br/>• Suspension from participation in MUISA activities for a defined period;<br/>• Removal from any office held; or<br/>• Permanent expulsion from MUISA.', body_style))

story.append(Paragraph('<b>Section 5 — Right of Appeal</b>', section_style))
story.append(Paragraph('A member aggrieved by a disciplinary decision of the Board may appeal in writing to the Faculty Advisor within fourteen (14) days of being notified. The Faculty Advisor shall convene an appeal panel within fourteen (14) days of receiving the appeal. The decision of the appeal panel shall be final and binding on all parties.', body_style))

story.append(PageBreak())

# --- PAGE 11 ---
story.append(Paragraph('Article VIII — Committees &amp; Projects', article_style))
story.append(Paragraph('<b>Section 1 — Standing Committees</b>', section_style))
story.append(Paragraph('MUISA shall maintain the following standing committees, each aligned with the core mission:', body_style))
comms = [
    '• <b>Technical Committee</b> — coordinated by the Technical Lead; responsible for ICT projects, coding clubs, and technical capacity building.',
    '• <b>Cybersecurity Committee</b> — coordinated by the Cybersecurity Lead; responsible for security awareness, CTF competitions, and digital safety.',
    '• <b>Training &amp; Development Committee</b> — coordinated by the Training Coordinator; responsible for skill-building programmes, bootcamps, and external learning opportunities.',
    '• <b>Events Committee</b> — coordinated by the Event Coordinator; responsible for all MUISA events, including hackathons, exhibitions, and community engagements.',
    '• <b>PR &amp; Communications Committee</b> — coordinated by the PR &amp; Social Media Officer; responsible for MUISA\'s brand, content, and public presence.',
    '• <b>Projects Committee</b> — coordinated by the Project Manager; responsible for tracking and delivering all active MUISA projects.'
]
for c in comms:
    story.append(Paragraph(c, bullet_style))

story.append(Paragraph('<b>Section 2 — Committee Membership</b>', section_style))
story.append(Paragraph('Any paid-up MUISA member in good standing may join a standing committee. Committee membership is encouraged as a way for ordinary members to contribute meaningfully to the Association\'s work and develop their own leadership skills.', body_style))

story.append(Paragraph('<b>Section 3 — Reporting</b>', section_style))
story.append(Paragraph('Each committee shall submit a written activity report to the Secretary at every Board meeting. Committees shall operate within budgets approved by the Treasurer and the Board.', body_style))

story.append(Paragraph('<b>Section 4 — Ad-hoc Committees</b>', section_style))
story.append(Paragraph('The Executive Board may establish ad-hoc committees or task forces for specific projects or events. Such bodies shall dissolve automatically upon completion of their assigned mandate, unless renewed by the Board.', body_style))

story.append(Paragraph('Article IX — Amendments to the Constitution', article_style))
story.append(Paragraph('<b>Section 1 — Proposals</b>', section_style))
story.append(Paragraph('Any paid-up MUISA member in good standing may propose an amendment to this Constitution by submitting a written proposal to the Secretary. The proposal must specify: the clause(s) to be amended; the proposed replacement text; and the reasons for the amendment.', body_style))

story.append(Paragraph('<b>Section 2 — Notice</b>', section_style))
story.append(Paragraph('All proposed amendments must be circulated to every member at least fourteen (14) days before the meeting at which they are to be debated and voted upon.', body_style))

story.append(Paragraph('<b>Section 3 — Adoption</b>', section_style))
story.append(Paragraph('An amendment shall be adopted upon receiving a two-thirds (2/3) majority vote of paid-up members present and voting at a General Meeting at which a quorum is present. Amendments shall take effect immediately upon adoption unless the motion itself specifies a deferred effective date.', body_style))

story.append(Paragraph('<b>Section 4 — Periodic Review</b>', section_style))
story.append(Paragraph('The Executive Board shall conduct a formal review of this Constitution at least once every two (2) academic years. Any recommended amendments shall be submitted to the General Meeting per the procedures in this Article.', body_style))

story.append(PageBreak())

# --- PAGE 12 ---
story.append(Paragraph('Article X — Dissolution of MUISA', article_style))
story.append(Paragraph('<b>Section 1 — Procedure</b>', section_style))
story.append(Paragraph('A proposal to dissolve MUISA must be submitted in writing to the Secretary. A Special General Meeting shall be convened with at least twenty-one (21) days\' written notice to all members, stating dissolution as the sole agenda item. Dissolution shall require a three-quarters (3/4) majority vote of all paid-up members in good standing — not merely those present — to take effect.', body_style))

story.append(Paragraph('<b>Section 2 — Winding Up</b>', section_style))
story.append(Paragraph('Upon dissolution, the Executive Board, under the supervision of the Faculty Advisor, shall settle all outstanding debts and obligations of MUISA before transferring any remaining assets in accordance with Article VI, Section 6.', body_style))

story.append(Paragraph('<b>Section 3 — Notification</b>', section_style))
story.append(Paragraph('The Secretary shall notify the relevant Mzuzu University authority and the Faculty Advisor in writing within seven (7) days of the dissolution resolution.', body_style))

story.append(Paragraph('Article XI — Commencement &amp; Adoption', article_style))
story.append(Paragraph('This Constitution shall come into force upon adoption by a two-thirds (2/3) majority vote of the founding members at a duly constituted General Meeting of MUISA.', body_style))

story.append(Spacer(1, 10))
story.append(Paragraph('<b>Adopted at the MUISA 3rd Board Meeting held at:</b>', body_style))
story.append(Paragraph('<b>Date:</b> 7th June 2026<br/><b>Venue:</b> ICT Lab 2, Mzuzu University', body_style))

story.append(PageBreak())

# --- PAGE 13 (Signatures & Official Endorsement) ---
story.append(Paragraph('Official Signatures &amp; Endorsement', article_style))
story.append(Paragraph('Signed on behalf of the founding members:', body_style))
story.append(Spacer(1, 15))

sign_data = [
    [Paragraph('<b>President:</b>', body_style), Paragraph('________________________', body_style), Paragraph('<b>Signature:</b>', body_style), Paragraph('________________', body_style), Paragraph('<b>Date:</b> ___________', body_style)],
    [Paragraph('<b>Secretary:</b>', body_style), Paragraph('________________________', body_style), Paragraph('<b>Signature:</b>', body_style), Paragraph('________________', body_style), Paragraph('<b>Date:</b> ___________', body_style)],
    [Paragraph('<b>Treasurer:</b>', body_style), Paragraph('________________________', body_style), Paragraph('<b>Signature:</b>', body_style), Paragraph('________________', body_style), Paragraph('<b>Date:</b> ___________', body_style)],
    [Paragraph('<b>Faculty Advisor:</b>', body_style), Paragraph('________________________', body_style), Paragraph('<b>Signature:</b>', body_style), Paragraph('________________', body_style), Paragraph('<b>Date:</b> ___________', body_style)],
]

t = Table(sign_data, colWidths=[90, 140, 60, 100, 114])
t.setStyle(TableStyle([
    ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ('BOTTOMPADDING', (0,0), (-1,-1), 14),
]))
story.append(t)

story.append(Spacer(1, 35))
story.append(Paragraph('<b>Official MUISA Stamp:</b>', section_style))
stamp_box = Table([[Paragraph('<br/><br/><br/><i>[ Official Seal / Stamp of MUISA ]</i><br/><br/><br/>', ParagraphStyle('StampText', alignment=1, textColor=colors.HexColor('#9CA3AF')))]], colWidths=[240])
stamp_box.setStyle(TableStyle([
    ('BOX', (0,0), (-1,-1), 1.5, primary_green),
    ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#F9FAFB')),
    ('ALIGN', (0,0), (-1,-1), 'CENTER'),
]))
story.append(stamp_box)

doc.build(story, canvasmaker=NumberedCanvas)

# Also copy to root public/MUISA_Constitution.pdf
shutil.copyfile(pdf_path, 'public/MUISA_Constitution.pdf')

print('Generated 13-page MUISA Constitution PDF successfully!')
