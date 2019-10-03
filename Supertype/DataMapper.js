class DomainMapper {
  insert(domainModel) {
    console.log('Insert domain model');
    console.log(domainModel);
  }

  update(domainModel) {
    console.log('Update domain model');
  }

  delete(domainModel) {
    console.log('Delete domain model');
  }

  find(domainModel) {
    console.log('Find data for domain model');
  }
}


module.exports = {
  DomainMapper,
}