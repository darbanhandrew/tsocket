from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in tsocket/__init__.py
from tsocket import __version__ as version

setup(
	name="tsocket",
	version=version,
	description="Taskerpage socket for connecting to app",
	author="Mohammad Darban baran ",
	author_email="darbanhandrew@gmail.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
