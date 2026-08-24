# Demo app - the point of this project is its outdated requirements.txt,
# not this file. PyYAML 5.1 has known vulnerabilities around unsafe
# deserialization (CVE-2019-20477, CVE-2020-1747); Jinja2 2.10 has a known
# sandbox escape / template injection issue (CVE-2019-10906).
import yaml

config = yaml.safe_load("service: demo-ml-service\nversion: 1.0")
print(f"Demo service config loaded: {config}")
