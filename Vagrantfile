# vi: set ft=ruby :
# Vagrant::DEFAULT_SERVER_URL.replace('https://vagrantcloud.com')
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "ubuntu/xenial64"
  config.vm.box_version = '>= 20160921.0.0'

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine. In the example below,
  # accessing "localhost:8080" will access port 80 on the guest machine.
  # config.vm.network "forwarded_port", guest: 80, host: 3599
  config.vm.network "forwarded_port", guest: 3000, host: 3000
  config.vm.network "forwarded_port", guest: 3001, host: 3001
  config.vm.network "forwarded_port", guest: 5000, host: 5000

  # Share an additional folder to the guest VM. The first argument is
  # the path on the host to the actual folder. The second argument is
  # the path on the guest to mount the folder. And the optional third
  # argument is a set of non-required options.
  config.vm.synced_folder "./", "/home/vagrant/project"
  # config.vm.synced_folder "../data", "/vagrant_data"

  # Provider-specific configuration so you can fine-tune various
  # backing providers for Vagrant. These expose provider-specific options.
  # If you need to more than double the defaults for this course, you have
  # done something wrong.
  cpus = "1"
  memory = "512" # MB
  config.vm.provider :virtualbox do |vb|
    vb.customize ["modifyvm", :id, "--cpus", cpus, "--memory", memory]
    vb.customize ["modifyvm", :id, "--uartmode1", "disconnected"] # speed up boot https://bugs.launchpad.net/cloud-images/+bug/1627844
    #vb.gui = true
  end
  config.vm.provider "vmware_fusion" do |v, override|
    v.vmx["memsize"] = memory
    v.vmx["numvcpus"] = cpus
  end
  config.vm.provider :cloudstack do |cloudstack, override|
    override.vm.box = "Ubuntu-16.04-SSH-Keys"
    cloudstack.scheme = "https"
    cloudstack.host = "sfucloud.ca"
    cloudstack.path = "/client/api"
    cloudstack.api_key = ENV['CLOUDSTACK_KEY'] || "AAAAAAAAAAAAAAAA"
    cloudstack.secret_key = ENV['CLOUDSTACK_SECRET'] || "AAAAAAAAAAAAAAAA"
    cloudstack.service_offering_name = "sc.t2.micro"
    cloudstack.zone_name = "NML-Zone"
    cloudstack.name = "cmpt470-#{File.basename(Dir.getwd)}-#{Random.new.rand(100)}"
    cloudstack.ssh_user = "ubuntu"
    cloudstack.security_group_names = ['CMPT 470 firewall']
  end

  # config.berkshelf.enabled = true
  # config.berkshelf.berksfile_path = './Berksfile'

  # Enable provisioning with chef solo, specifying a cookbooks path, roles
  # path, and data_bags path (all relative to this Vagrantfile), and adding
  # some recipes and/or roles.
  config.vm.provision "chef_solo" do |chef|
    chef.cookbooks_path = "chef/cookbooks"

    chef.add_recipe "baseconfig"
    chef.add_recipe "nodejs"
    chef.add_recipe "yarn"

    #chef.channel = "stable"
    #chef.version = "12.10.24"
  end

  config.vm.provision "shell", inline: <<-SHELL
    npm i -g n
    n 8.9.0
    npm i -g npm@latest
  SHELL

  config.vm.provision "file", source: "./react-fullstack", destination: "react-fullstack"
  config.vm.provision :shell, :inline => "cd /home/vagrant/project/react-fullstack && sudo npm run clean && sudo npm start", run: "always"
end