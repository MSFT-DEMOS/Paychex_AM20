# MCP Server Discovery and Integration Prompt

## Context
You are working with the OctoCAT Supply Chain Management System, a TypeScript-based application with:
- **Backend**: Express.js REST API with Entity models
- **Frontend**: React + TypeScript with Tailwind CSS
- **Database**: Entities include Headquarters, Branch, Order, Product, Supplier, Delivery
- **Features**: Supply chain tracking, order management, inventory control
- **Architecture**: Modern containerized application with Docker support

## Task
Analyze the project structure and requirements to identify the most valuable MCP (Model Context Protocol) servers that could enhance development workflow, productivity, and functionality.

**Important**: Always fetch the latest MCP servers from: https://code.visualstudio.com/mcp

## Available MCP Server Categories

### 🛠️ Developer Tools
Consider these MCP servers for development enhancement:

**GitHub Integration**
- **GitHub MCP Server**: Access repositories, issues, pull requests through secure API
- **Use cases**: Automate issue creation, manage PRs, sync repository data
- **Relevance**: HIGH - Essential for version control and collaboration

**Documentation & Code Quality**
- **Microsoft Docs MCP**: Access Azure documentation and Microsoft technical resources
- **Use cases**: Quick reference for Azure deployment, TypeScript best practices
- **Relevance**: MEDIUM - Useful for cloud deployment guidance

**Testing & Automation**
- **Playwright MCP**: Automate web browsers using accessibility trees
- **Use cases**: E2E testing for supply chain workflows, automated UI testing
- **Relevance**: HIGH - Critical for testing complex supply chain scenarios

**Code Analysis**
- **DeepWiki MCP**: Query GitHub repositories indexed on DeepWiki
- **Use cases**: Analyze similar supply chain projects, find implementation patterns
- **Relevance**: MEDIUM - Helpful for research and best practices

**File Processing**
- **MarkItDown MCP**: Convert various file formats to Markdown
- **Use cases**: Process supply chain documents, convert Excel inventory files
- **Relevance**: MEDIUM - Useful for document processing workflows

### 📊 Data & Analytics
Essential for supply chain data management:

**Database Integration**
- **DuckDB MCP**: Query and analyze data locally and in cloud
- **Use cases**: Analytics on order patterns, supplier performance, inventory trends
- **Relevance**: HIGH - Perfect for supply chain analytics

**Data Extraction**
- **Firecrawl MCP**: Advanced web scraping and data extraction
- **Use cases**: Extract supplier catalogs, monitor competitor pricing
- **Relevance**: MEDIUM - Useful for market research and data collection

**Database Management**
- **Neon MCP**: Manage Postgres databases with natural language
- **Use cases**: Database schema evolution, query optimization
- **Relevance**: HIGH - If using PostgreSQL for production

### 📋 Productivity & Project Management
Streamline development and business processes:

**Project Management**
- **Linear MCP**: Create, update, and track issues
- **Use cases**: Feature planning, bug tracking, sprint management
- **Relevance**: HIGH - Essential for agile development

**Documentation**
- **Notion MCP**: View, search, create, and update Notion pages
- **Use cases**: Project documentation, knowledge base, team collaboration
- **Relevance**: MEDIUM - If using Notion for documentation

**Task Management**
- **Atlassian MCP**: Connect to Jira and Confluence
- **Use cases**: Issue tracking, documentation, enterprise workflows
- **Relevance**: MEDIUM - If using Atlassian ecosystem

**Workflow Automation**
- **Zapier MCP**: Create workflows across 30,000+ connected apps
- **Use cases**: Automate supply chain notifications, integrate with ERP systems
- **Relevance**: MEDIUM - For business process automation

**Memory & Context**
- **Memory MCP**: Store and retrieve contextual information across sessions
- **Use cases**: Remember project decisions, maintain context across dev sessions
- **Relevance**: HIGH - Enhances development continuity

### 💼 Business Services
Enhance supply chain functionality:

**Payment Processing**
- **Stripe MCP**: Create customers, manage subscriptions, payment links
- **Use cases**: B2B payment processing, supplier payments, invoicing
- **Relevance**: MEDIUM - If adding payment features

**Customer Support**
- **Intercom MCP**: Access customer conversations and support tickets
- **Use cases**: Customer service integration, feedback analysis
- **Relevance**: LOW - Unless adding customer support features

### ☁️ Cloud & Infrastructure
For deployment and scaling:

**Azure Integration**
- **Azure MCP**: Manage Azure resources, query databases
- **Use cases**: Cloud deployment, resource monitoring, database management
- **Relevance**: HIGH - If deploying to Azure

**Azure DevOps**
- **Azure DevOps MCP**: Manage projects, repositories, builds, releases
- **Use cases**: CI/CD pipeline management, automated deployments
- **Relevance**: HIGH - If using Azure DevOps

**Backend Services**
- **Convex MCP**: Access Convex backend databases and functions
- **Use cases**: Real-time data operations, serverless functions
- **Relevance**: MEDIUM - Alternative backend consideration

## Recommended Priority Installation Order

### Phase 1: Essential Development Tools
1. **GitHub MCP Server** - Version control and collaboration
2. **Memory MCP Server** - Context preservation across sessions
3. **Linear MCP Server** - Project management and issue tracking

### Phase 2: Data and Analytics
4. **DuckDB MCP Server** - Supply chain analytics and reporting
5. **Playwright MCP Server** - Automated testing of supply chain workflows

### Phase 3: Cloud and Deployment
6. **Azure MCP Server** - If deploying to Azure cloud
7. **Azure DevOps MCP Server** - If using Azure DevOps for CI/CD

### Phase 4: Business Enhancement
8. **Zapier MCP Server** - Business process automation
9. **Stripe MCP Server** - If adding payment processing
10. **Firecrawl MCP Server** - For competitive analysis and data extraction

## Implementation Considerations

### Technical Requirements
- Ensure MCP servers align with TypeScript/Node.js ecosystem
- Consider Docker compatibility for containerized deployment
- Verify API rate limits and authentication requirements

### Business Value Assessment
- Prioritize servers that enhance supply chain-specific workflows
- Focus on tools that improve development velocity
- Consider integration complexity vs. business value

### Security Considerations
- Review data handling policies for each MCP server
- Ensure compliance with supply chain data regulations
- Implement proper API key management and rotation

## Action Items
1. **Immediate**: Install GitHub and Memory MCP servers for basic workflow enhancement
2. **Short-term**: Add Linear for project management and Playwright for testing
3. **Medium-term**: Integrate DuckDB for analytics capabilities
4. **Long-term**: Consider cloud-specific MCP servers based on deployment strategy

## Questions to Consider
- What is the current project management tool being used?
- Are there plans for cloud deployment (Azure, AWS, etc.)?
- What analytics capabilities are needed for supply chain insights?
- Are there specific business integrations required (payments, ERP systems)?
- What is the testing strategy for the application?

This prompt should help identify the most valuable MCP servers for enhancing the OctoCAT Supply Chain Management System development and operational workflows.
