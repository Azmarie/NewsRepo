# Make sure the Apt package lists are up to date, so we're downloading versions that exist.
# cookbook_file "index.html" do
#   path "/var/www/html/index.html"
# end

# include_recipe "nodejs::nodejs_from_package"
# include_recipe "nodejs::nodejs_from_package"

# cookbook 'nodejs', '~> 5.0.0'

cookbook_file "apt-sources.list" do
  path "/etc/apt/sources.list"
end
execute 'apt_update' do
  command 'apt-get update'
end

# Base configuration recipe in Chef.
package "wget"
package "ntp"
# package "nginx" #webserver
package "ack-grep"
package "tree"
# package "postgresql"


cookbook_file "ntp.conf" do
  path "/etc/ntp.conf"
end
execute 'ntp_restart' do
  command 'service ntp restart'
end
