## Challenge B: Venture Capital Platform - "DealTracker"

### Problem Statement
Create a simplified deal management platform where VC firms can track startup pitches and manage their investment pipeline.

### Core Requirements

#### 1. User Authentication (Required)
- **VC Partners**: Can manage deals and view analytics
- **Entrepreneurs**: Can submit pitches and track status
- Simple role-based access

#### 2. Pitch Submission (Required)
- Entrepreneurs can submit:
  - Company name, description, industry
  - Funding amount requested
  - Basic company metrics (revenue, team size)
  - Contact information
  - Single pitch deck upload (PDF)

#### 3. Deal Pipeline Management (Required)
- VC Partners can:
  - View all submitted pitches
  - Update deal status (Applied, Under Review, Due Diligence, Rejected, Invested)
  - Add notes to deals
  - Filter deals by status and industry

#### 4. Communication (Required)
- Simple messaging system between VCs and entrepreneurs
- Status update notifications
- Basic email notifications for status changes

#### 5. Dashboard & Analytics (Required)
- **VC Dashboard**: Deal pipeline overview, status distribution
- **Entrepreneur Dashboard**: Submitted pitches, status updates
- Basic charts showing deal flow metrics

### Technical Implementation
- Modern frontend framework
- RESTful API design
- File upload handling for pitch decks
- Real-time updates for messaging (WebSocket or polling)
- Proper data relationships

### Bonus Features (Optional)
- Advanced filtering and search
- Deal scoring system
- Export functionality
- Calendar integration for meetings
- Simple document viewer for pitch decks

---
