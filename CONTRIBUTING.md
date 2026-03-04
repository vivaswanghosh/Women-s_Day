# CraftLens AI - Contributing Guide

## Welcome Contributors! 👋

We're excited to have you contribute to CraftLens AI. This guide will help you get started.

---

## Code of Conduct

- Be respectful and inclusive
- No harassment or discrimination
- Help each other learn
- Celebrate contributions
- Report issues to: conduct@craftlens.ai

---

## Getting Started

### 1. Fork the Repository
```bash
git clone https://github.com/yourusername/craftlens-ai.git
cd craftlens-ai
```

### 2. Create Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### 3. Follow Naming Conventions
- Features: `feature/short-description`
- Bugfixes: `bugfix/issue-number-description`
- Hotfixes: `hotfix/issue-number-description`

---

## Development Workflow

### Code Style

**JavaScript/React:**
```javascript
// Use const/let, not var
const userName = "John";
let count = 0;

// Use arrow functions
const calculate = (a, b) => a + b;

// Use meaningful names
const getUserProducts = async () => { }

// Comment complex logic
// Calculate weighted average for pricing
const weighted = prices.reduce(...);
```

**File Organization:**
```
components/
  ├── Navbar.js
  ├── ProductCard.js
  └── index.js

pages/
  ├── Dashboard.js
  └── Products.js

utils/
  ├── api.js
  └── AuthContext.js
```

**Naming Conventions:**
- Components: PascalCase (`ProductCard.js`)
- Files: PascalCase for components, camelCase for utils
- Functions: camelCase (`getUserProfile`)
- Classes: PascalCase (`User`)
- Constants: UPPER_SNAKE_CASE (`MAX_UPLOADS`)

### Commit Messages

Write clear, descriptive commit messages:
```
feat: add price fairness meter
bugfix: fix image upload validation
docs: update API documentation
refactor: simplify pricing algorithm
test: add unit tests for auth
style: format code with prettier
```

**Format:**
```
<type>: <subject>

<body (optional)>

<footer (optional)>
```

### Git Workflow
```bash
# Update main
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/my-feature

# Make changes
# Test thoroughly
git add .
git commit -m "feat: add my feature"

# Keep branch updated
git pull origin main --rebase

# Push to fork
git push origin feature/my-feature

# Create Pull Request on GitHub
```

---

## Testing

### Unit Tests
```bash
npm test
```

### Running Tests Locally
```javascript
// Example test structure
describe('PricingEngine', () => {
  it('should calculate correct weighted average', () => {
    const result = calculateWeightedPrice([...]);
    expect(result).toBe(899);
  });
});
```

### Adding Tests
- Write tests for new features
- Update tests when changing logic
- Aim for 80%+ coverage

---

## Documentation

### When to Document
- New features
- API changes
- Complex algorithms
- Configuration options

### Documentation Template
```markdown
# Feature Name

## Overview
Brief description of what this does.

## Usage
```javascript
const result = useFeature(options);
```

## Parameters
- `param1` (type): Description
- `param2` (type): Description

## Returns
Description of return value

## Example
```javascript
// Concrete usage example
```

## Notes
- Important considerations
- Known limitations
```

---

## Pull Request Process

### Before Submitting
1. Create feature branch from main
2. Make your changes
3. Test thoroughly
4. Update documentation
5. Write meaningful commit messages

### PR Template
```markdown
## Description
What does this PR do?

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Closes #123

## Testing
How was this tested?

## Checklist
- [ ] Tests pass
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Code follows style guide
```

### Review Process
1. Submit PR with clear description
2. Address review feedback
3. Request re-review
4. Merge when approved

---

## Areas to Contribute

### Backend
- [ ] Improve pricing algorithm
- [ ] Add more market data sources
- [ ] Implement real AI models
- [ ] Add payment integration
- [ ] Optimize database queries

### Frontend
- [ ] Improve UI/UX
- [ ] Add dark mode
- [ ] Mobile optimizations
- [ ] New Dashboard charts
- [ ] Product discovery page

### Documentation
- [ ] Improve READMEs
- [ ] Add video tutorials
- [ ] Create API examples
- [ ] Write blog posts
- [ ] Translate to other languages

### DevOps
- [ ] Improve CI/CD pipeline
- [ ] Add monitoring
- [ ] Database optimization
- [ ] Performance testing
- [ ] Security hardening

### Data
- [ ] Collect market data
- [ ] Create training datasets
- [ ] Data validation

---

## Common Issues & Solutions

### Issue: Changes not reflecting
```bash
# Clear cache and restart
rm -rf node_modules
npm install
npm start
```

### Issue: Port already in use
```bash
# Kill process
lsof -ti:3000 | xargs kill -9
```

### Issue: Database connection error
```bash
# Verify MongoDB is running
mongosh

# Check connection string in .env
```

---

## Getting Help

### Resources
- [Project README](README.md)
- [Architecture Guide](ARCHITECTURE.md)
- [API Documentation](API_DOCUMENTATION.md)

### Questions?
- Open issue on GitHub
- Ask in discussions
- Email: devhelp@craftlens.ai

### Code Review Tips
- Be open to feedback
- Explain your approach
- Ask questions if unclear
- Iterate based on suggestions

---

## Commit Examples

### Good Commits
```bash
# Clear, specific, descriptive
git commit -m "feat: add price fairness meter with visual indicator"

git commit -m "bugfix: fix MongoDB connection timeout issue"

git commit -m "docs: add API endpoint examples"

git commit -m "refactor: simplify cosine similarity calculation"

git commit -m "test: add unit tests for profit calculator"
```

### Bad Commits
```bash
# Too vague
git commit -m "fix stuff"

# Too long in subject
git commit -m "add feature that implements the ability for users to see their price which is calculated based on market data and similarity"

# Mixing features
git commit -m "add feature X, fix bug Y, update docs"
```

---

## Setting Up Development Environment

### VSCode Extensions Recommended
- Prettier - Code formatter
- ESLint - Code quality
- Thunder Client - API testing
- MongoDB for VS Code
- REST Client
- Git Graph

### VSCode Settings
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.tabSize": 2,
  "[javascript]": {
    "editor.formatOnSave": true
  }
}
```

---

## Version Control Best Practices

### Branch Naming
```
main                    # Production
├── develop             # Development
│   ├── feature/new-ui
│   ├── bugfix/issue-123
│   └── hotfix/urgent-bug
```

### Keeping Fork Updated
```bash
# Add upstream
git remote add upstream https://github.com/original/craftlens-ai.git

# Sync main
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

---

## Release Process

### Version Numbering
We follow Semantic Versioning: `MAJOR.MINOR.PATCH`
- `1.0.0` - Initial release
- `1.1.0` - New features
- `1.1.1` - Bug fixes
- `2.0.0` - Breaking changes

### Release Checklist
- [ ] All tests passing
- [ ] Documentation updated
- [ ] Changelog updated
- [ ] Version number bumped
- [ ] Tag created on GitHub
- [ ] Release notes written

---

## Rewards & Recognition

We appreciate all contributions! Recognized contributors get:
- Credit in README
- Mention in release notes
- Special badge on GitHub
- Early access to new features
- Opportunity to join core team

---

## Questions?

### Still have questions?
- Check existing issues
- Search documentation
- Create a new issue
- Email: contrib@craftlens.ai

---

**Thank you for contributing to CraftLens AI! 🚀**

Let's build something amazing together! 💜
